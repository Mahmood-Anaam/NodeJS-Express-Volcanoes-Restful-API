const Comment = require("../models/commentModel");

const getComments = async (req, res,next) => {


  try {
    const { id, ...otherQueries } = req.params;
    // Check for invalid query parameters
    const validQueries = ["id"];
    const invalidQueries = Object.keys(otherQueries).filter(
      (param) => !validQueries.includes(param)
    );

    if (!id || isNaN(id) || invalidQueries.length > 0) {
      return res.status(400).json({
        error: true,
        message:
          "Invalid query parameters. Query parameters are not permitted.",
      });
    }


    const volcanoExists = await Comment.checkVolcanoExists(id);
    if (!volcanoExists) {
      return res.status(404).json({
        error: true,
        message: `Volcano with ID: ${id} not found.`,
      });
    }

    const comments = await Comment.getCommentsByVolcanoId(id);
    const averageRating = await Comment.getAverageRating(id);

    res.status(200).json({
      comments,
      average_rating: averageRating.averageRating || null,
    });

  } catch (err) {
    next(err);
  }

};







const addComment = async (req, res,next) => {

  const { id } = req.params;
  const { comment, rating } = req.body;
  const user_id = req.user.email;

  if (!comment || rating == null) {
    return res.status(400).json({
      error: true,
      message: "Comment and rating are required.",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      error: true,
      message: "Rating must be between 1 and 5.",
    });
  }

  const volcanoExists = await Comment.checkVolcanoExists(id);
  if (!volcanoExists) {
    return res.status(404).json({
      error: true,
      message: `Volcano with ID: ${id} not found.`,
    });
  }

  try {
    await Comment.insertComment({
      volcano_id: id,
      user_id,
      comment,
      rating
    });
    return res.status(201).json({
      message: "Comment added successfully.",
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getComments,
  addComment

};