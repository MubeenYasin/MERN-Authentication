import axios from "axios"

// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY
// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=businessANDblockchain&sortBy=publishedAtlanguage=en&apiKey=${NEWS_API_KEY}`
const NEWS_API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f35371195d9749b3b3d6d3d3a0defe8e`
const CRYPTO_API_ENDPOINT = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`




export const getNews = async () => {
    let response

    try {
        response = await axios.get(NEWS_API_ENDPOINT);
        response = response.data.articles.slice(0, 12);
        // console.log('External.js', response) // TEST POINT
    }
    catch (error) {
        return error
    }
    return response
}

export const getCrypto = async () => {
    let response
    try {
        response = await axios.get(CRYPTO_API_ENDPOINT)
        response = response.data
    }
    catch (error) {
        console.log(error)
    }
     return response
}