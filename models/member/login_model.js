const client = require('../connection_db');
const config = require('../../config/development_config');
const jwt = require('jsonwebtoken');

module.exports = async function memberLogin(data) {
    await client.connect();
    const db = client.db(config.mongo.database);
    const member = db.collection(config.mongo.member);

    try {
        const findResult = await member.findOne({
            email: data.email,
            password: data.password
        });
        if (!findResult) throw new Error("請輸入正確的帳號或密碼");
        data = findResult;

        data.refresh_token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // token7天後過期。
                data: data._id.toString()
            },
            config.fresh_secret
        );

        // 更新refresh_token
        const refreshToken = await member.updateOne({ _id: data._id }, {
            $set: {
                refresh_token: data.refresh_token
            }
        });
        if (!refreshToken) throw new Error("refresh_token 更新失敗");
        return data;
    } catch (err) {
        throw err
    } finally {
        client.close()
    }
}