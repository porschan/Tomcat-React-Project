import config from "../config";

export function isBlank(object) {
    let result = false;
    if (object === undefined || object === null || object.toString().trim() === '') {
        result = true;
    }
    return result;
}

export function isNotBlank(object) {
    return !isBlank(object);
}


/**
 * 格式化数字为金额
 * @param inputText 输入金额的
 * @param negative  是否允许负数, 默认不传为true
 */
export function formatMoney(inputText, negative) {
    inputText = inputText.toString();
    //先把非数字的都替换掉，除了数字和.
    inputText = inputText.replace(/[^\d.-]/g, "");
    //必须保证第一个为数字而不是.
    inputText = inputText.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    inputText = inputText.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    inputText = inputText.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

    //处理负号
    let fh = inputText.substr(0, 1);
    if (fh!=="-") {
        fh = "";
    } else {
        inputText = inputText.substr(1);
        inputText = inputText.replace(/^\./g, "");
    }

    if (inputText.lastIndexOf("-") > -1) {
        let v = inputText.split("-");
        inputText = v.join("");
    }

    //剪掉非小数的0开头的数字的开头的0
    if (inputText.indexOf("0") === 0 && inputText.indexOf(".") !== 1) {
        inputText = parseInt(inputText).toString();
        return inputText;
    }

    //保留两位小数
    if (inputText.indexOf(".") > -1) {
        let values = inputText.split(".");
        if (values[1].length > 2) {
            values[1] = values[1].substr(0, 2);
            inputText = values[0] + "." + values[1];
        }
    }

    if (isBlank(negative)) {
        negative = true;
    }

    if (negative) {
        return fh.concat(inputText);
    } else {
        return inputText;
    }
}


/**
 * 格式化整数
 * @param inputText 输入数字
 * @param negative  是否允许负数, 默认不传为true
 */
export function formatInt(inputText, negative) {
    inputText = inputText.toString();
    //先把非数字的都替换掉，除了数字和.
    inputText = inputText.replace(/[^\d]/g, "");
    //必须保证第一个为数字而不是.
    inputText = inputText.replace(/^\./g, "");

    //处理负号
    let fh = inputText.substr(0, 1);
    if (fh!=="-") {
        fh = "";
    } else {
        inputText = inputText.substr(1);
        inputText = inputText.replace(/^\./g, "");
    }

    //剪掉非小数的0开头的数字的开头的0
    if (inputText.indexOf("0") > -1) {
        inputText = parseInt(inputText).toString();
    }

    if (isBlank(negative)) {
        negative = true;
    }

    if (negative) {
        return fh.concat(inputText);
    } else {
        return inputText;
    }
}


/**
 * 格式化数字为浮点数
 * @param inputText 输入金额的
 * @param negative  是否允许负数, 默认不传为true
 */
export function formatFloat(inputText, negative) {
    inputText = inputText.toString();
    //先把非数字的都替换掉，除了数字和.
    inputText = inputText.replace(/[^\d.-]/g, "");
    //必须保证第一个为数字而不是.
    inputText = inputText.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    inputText = inputText.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    inputText = inputText.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

    //处理负号
    let fh = inputText.substr(0, 1);
    if (fh!=="-") {
        fh = "";
    } else {
        inputText = inputText.substr(1);
        inputText = inputText.replace(/^\./g, "");
    }

    if (inputText.lastIndexOf("-") > -1) {
        let v = inputText.split("-");
        inputText = v.join("");
    }

    //剪掉非小数的0开头的数字的开头的0
    if (inputText.indexOf("0") === 0 && inputText.indexOf(".") !== 1) {
        inputText = parseInt(inputText).toString();
        return inputText;
    }

    if (isBlank(negative)) {
        negative = true;
    }

    if (negative) {
        return fh.concat(inputText);
    } else {
        return inputText;
    }
}

/**
 * 去除数字末尾的小数点
 * @param inputText 输入数字的input节点
 */
export function reFormatOnFocusOut(inputText) {
    inputText = inputText.toString();
    if (inputText.indexOf(".") === inputText.length - 1) {
        inputText = inputText.substr(0, inputText.indexOf("."));
    }
    return inputText;
}


/**
 * 只能输入英文和数字以及下横线
 * @param inputText 输入的字符
 */
export function formatLetterNumber(inputText) {
    inputText = inputText.toString();
    inputText = inputText.replace(/[^a-zA-Z0-9_]/g, "");
    return inputText;
}

/**
 * 根据后缀即可判断文件的类型（文件格式）
 * @param filePath e.g.:file:///storage/emulated/0/opmark/User/Pic/hangge.png
 * @returns {boolean}
 */
export function isAssetTypeAnImage(filePath) {
    // 获取最后一个.的位置
    let index= filePath.lastIndexOf(".");
    // 获取后缀
    let ext = filePath.substr(index+1);
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
}

export function swapBr2N(inputText) {
    inputText = inputText.toString();
    inputText = inputText.replace(new RegExp(/<br\/>/g), '\n');
    return inputText;
}

export function swapN2Br(inputText) {
    inputText = inputText.toString();
    inputText = inputText.replace(new RegExp(/\n/g), '<br/>');
    return inputText;
}

export  function isDeviceOperation(roleList) {
    let result = false;
    if(roleList != null && roleList.length > 0){
        roleList.map((item, index) => {
            if(item != null && item.name != null && (item.name === "系统管理员" || item.enName === "dept")){
                result = true;
            }
            if(item != null && item.name != null && (item.name === "管理员" || item.enName === "administrator")){
                result = true;
            }
        })
    }
    return result;
}

export function hashLocation(url) {
    url = config.contextPath + "/#/" + url;
    url = url.replace(/[\/]+/g, '/');
    console.log(url);
    window.location.href = url;
}

// 20200212新增 - 判断数组是否为空
export function isArrayEmpty(value) {
    return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}
