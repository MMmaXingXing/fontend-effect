import "./index.css";

function domAdd () {
    document.body.innerText = "新文件刷新1212";
    new Promise(()=> {
        document.body.innerText = "成功！";
    });
};
domAdd();