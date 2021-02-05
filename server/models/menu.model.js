const query = require('../configs/db');
const { multipleColumnSet } = require('../utils/common.utils');

class MenuModal {
    tableName = 'menu';
    // id 	no_hp 	nama 	password 

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ menu_tittle, desc1, desc2, price, url_image}) => {
        const sql = `INSERT INTO ${this.tableName}
        (menu_tittle, desc1, desc2, price, url_image) VALUES (?,?,?,?,?)`;
// console.log(sql)
        const result = await query(sql, [menu_tittle, desc1, desc2, price, url_image]);
        // console.log(result)
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MenuModal;