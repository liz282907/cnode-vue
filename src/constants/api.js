const baseUrl = "https://cnodejs.org/api/v1/";
export default {
    getTopicDetail: {
        get url () {
            return baseUrl + 'topic/' + this.id
        }
    } 
}