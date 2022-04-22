// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";

const postData = [
  {
    _id: Date.now(),
    userName: "邊緣小杰",
    avatar: faker.internet.avatar(),
    content: "外面看起來就超冷.... \n我決定回被窩繼續睡....>.<",
    updateImage: faker.image.nature(1200, 600),
    likes: faker.random.number({ min: 1, max: 100 }),
    comments: faker.random.number({ min: 1, max: 100 }),
    replies: [],
  },
];

export const setFakeData = () => {
  !localStorage.getItem("posts") &&
    localStorage.setItem("posts", JSON.stringify(postData));
};

export const handlers = [
  rest.get("/posts", (req, res, ctx) => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        data: { data: posts },
      })
    );
  }),

  rest.post("/posts", async (req, res, ctx) => {
    const { userName, avatar, content, updateImage } = req.body;
    if (
      userName === undefined ||
      avatar === undefined ||
      content === undefined ||
      updateImage === undefined
    ) {
      return res(
        ctx.status(400),
        ctx.json({
          status: "fail",
          message: "參數有缺",
        })
      );
    }

    const posts = JSON.parse(localStorage.getItem("posts"));
    const newPost = {
      _id: Date.now(),
      userName,
      avatar: faker.internet.avatar(),
      content,
      updateImage: faker.image.nature(1200, 600),
      likes: faker.random.number({ min: 1, max: 100 }),
      comments: faker.random.number({ min: 1, max: 100 }),
      replies: [],
    };
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        post: newPost,
      })
    );
  }),
];
