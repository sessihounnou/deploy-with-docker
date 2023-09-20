const prisma = require("../prisma/index");

exports.CommunityPost = async (req, res, next) => {
  const { title, subTitle, published, imageUrl, authorId } = req.body;
  if (!title) {
    return res.status(500).send("title is required");
  }
  if (!imageUrl) {
    return res.status(500).send("imageUrl is required");
  }
  if (!authorId) {
    return res.status(500).send("authorId is required");
  }
  await prisma.community
    .create({
      data: {
        title,
        subTitle,
        published,
        imageUrl,
        authorId,
      },
    })
    .then((result) => {
      return res.status(200).send("Activity created successfully");
    })
    .catch((err) => {
      return res.status(500).send("An error occurred");
    });
};
exports.GetAllCommunityPost = async (req, res) => {
  await prisma.community
    .findMany()
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("An error occurred");
    });
};
exports.UpdateCommunityPost = async (req, res) => {
  const { id, title, subTitle, published, imageUrl, authorId } = req.body;
  await prisma.community
    .update({
      where: {
        id,
      },
      data: {
        title,
        subTitle,
        published,
        imageUrl,
        authorId,
      },
    })
    .then((result) => {
      return res.status(200).send("activity has been update sucessfuly");
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
};
exports.DeleteOneCommunityPost = async (req, res) => {
  const { id } = req.body;
  await prisma.community
    .delete({
      where: {
        id,
      },
    })
    .then((result) => {
      res
        .status(200)
        .send("You deleted successfully" + result + " the community post");
    })
    .catch((err) => {
      res.status(500).send("An error occurred");
    });
};
