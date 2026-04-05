import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import { BaseLayout } from "$templates/layouts"
import WaitingRoomView from "$templates/views/WaitingRoomView"

export const routerPrefix = "/waiting-room"

export const router = createRouter("waitingRoom", (server) => {
  server.route({
    url: ROUTE.WAITING_ROOM,
    method: "GET",
    schema: schemas[ROUTE.WAITING_ROOM],
    config: {
      authenticated: true,
    },
    handler: (_req, res) => {
      return res.view(<WaitingRoomView />, BaseLayout)
    },
  })
})
