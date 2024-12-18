import { BANNER_IMG_URL, BASE_URL, ICON_IMG_URL } from "./utils";

export const frame = {
    version: "next",
    imageUrl: BANNER_IMG_URL,
    button: {
      title: "Message Cortex",
      action: {
        type: "launch_frame",
        name: "Cortex",
        url: `${BASE_URL}`,
        splashImageUrl: ICON_IMG_URL,
        splashBackgroundColor: "#000000",
      },
    },
};