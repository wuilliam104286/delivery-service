module.exports = class CheckCustomer {
    //判斷email格式
    checkEmail(email) {
        const filt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = filt.test(email);
        return result;
    }

    //判斷空值
    checkNull(data) {
        for (var key in data) {
            return false;
        }
        return true;
    }
}