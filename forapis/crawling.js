const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

const getHtml = async () => {
    try {
      return await axios.get("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%8C%80%EC%A0%84+%EC%97%B0%EA%B7%B9&oquery=%EB%8C%80%EC%A0%84+%EA%B3%B5%EC%97%B0&tqi=U8ozasprvxZsseDZaHlssssss1C-250912");
    } catch (error) {
      console.error(error);
    }
};

