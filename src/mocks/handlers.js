// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";



const postData = [
  {
    id: 1650284959971,
    userPhoto: faker.internet.avatar(),
    userName: "邊緣小杰",
    content: "外面看起來就超冷.... \n我決定回被窩繼續睡....>.<",
    coverImage: faker.image.nature(1200, 600)
  },
];


export const setFakeData = () => {
    !localStorage.getItem("posts") &&
    localStorage.setItem("posts", JSON.stringify(postData));
}

export const handlers = [

  rest.get("/posts", (req, res, ctx) => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    return res(
      ctx.status(200),
      ctx.json({
        message: "success",
        posts,
      })
    );
  }),

  rest.post("/posts", async (req, res, ctx) => {
    const { userName, userPhoto, content, coverImage } = req.body;
    if (
      userName === undefined ||
      userPhoto === undefined ||
      content === undefined ||
      coverImage === undefined
    ) {

      return res(
        ctx.status(400),
        ctx.json({
          message: "參數有缺",
        })
      );
    }

    const posts = JSON.parse(localStorage.getItem("posts"));
    const newPost = {
        id: Date.now(),
        userPhoto: faker.internet.avatar(),
        userName,
        content,
        coverImage: faker.image.nature(1200, 600)
    }
    posts.push(newPost)
    localStorage.setItem("posts", JSON.stringify(posts));

    return res(
      ctx.status(200),
      ctx.json({
        message: "success",
        post: newPost,
      })
    );
  }),
];