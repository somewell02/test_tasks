import axios from "axios";

export const getTitleAtUrl = async (
  url: string
): Promise<string | undefined> => {
  try {
    const response = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    );

    const doc = new DOMParser().parseFromString(
      response.data.contents,
      "text/html"
    );

    const title = doc.querySelectorAll("title")[0];
    return title.innerText;
  } catch (e) {
    return undefined;
  }
};
