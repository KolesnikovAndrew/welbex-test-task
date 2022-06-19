const axios = require("axios");

export const welbexAPI = {
  getData() {
    return axios
      .get("http://localhost:3300/welbextable")
      .then((res) => res.data)
      .catch((err) => err.message);
  },
  getByPage(page, maxItemsOnPage) {
    return axios
      .get("http://localhost:3300/welbextable/" + page + "/" + maxItemsOnPage)
      .then((res) => res.data)
      .catch((err) => err.message);
  },
  async getSorted(column, condition, inputValue) {
    const result = await axios.get(
      `http://localhost:3300/welbextable&` +
        column +
        "&" +
        condition +
        "&" +
        inputValue
    );
    return result;
  },
  async getSortedByPage(column, condition, inputValue, page, maxItemsOnPage) {
    const result = await axios.get(
      `http://localhost:3300/welbextable&` +
        column +
        "&" +
        condition +
        "&" +
        inputValue +
        "/" +
        page +
        "&" +
        maxItemsOnPage
    );
    return result;
  },
};

export default welbexAPI;
