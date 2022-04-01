import { createServer, RequestListener } from "http";
import { NextApiHandler } from "next";
import request from "supertest";
import handler from "../../pages/api/[name]";
import { apiResolver } from "next/dist/server/api-utils/node";

const testClient = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => {
    return apiResolver(
      req,
      res,
      undefined,
      handler,
      {
        previewModeEncryptionKey: "",
        previewModeId: "",
        previewModeSigningKey: "",
      },
      false
    );
  };

  return request(createServer(listener));
};

it("What's my name!?", async () => {
  const client = testClient(handler);
  const response = await client.get("/api/name").query({ name: "John" });

  console.log(response.body);

  expect(true);
});
