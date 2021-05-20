const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');
const url = 'https://vue3-course-api.hexschool.io/';

function login(event) {
    event.preventDefault();
    // window.location = 'index.html';
    // 先設定api站台
    const user = {
        username: username.value, 
        password: password.value,
    }
    // 將user 設置成一個物件然後抓取input 裡面的value 值
    axios.post(`${url}admin/signin`, user).then((res) =>
     {
        if (res.data.success) {
            const { token, expired } = res.data;
            // 寫入 cookie tokenß
            // expires 設置有效時間
            document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
            window.location = 'index.html';//跳轉頁面
            console.log(res.data)
        }else {
            alert(res.data.message);
            console.log(res.data.message);
        }

    }).catch((error) =>{
        console.log(error);
    })

}
form.addEventListener('submit', login)




// sample

// const username = document.querySelector('#username');
// const password = document.querySelector('#password');
// const form = document.querySelector('#form');
// const url = 'https://vue3-course-api.hexschool.io/';


// function login(event) {
//   event.preventDefault();
//   const user = {
//     username: username.value,
//     password: password.value,
//   }
//   axios.post(`${url}admin/signin`, user).then((res) => {
      
//     if(res.data.success){
//       const { token, expired } = res.data;
//       document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
//       window.location ='products.html';
//       console.log(res.data)
//     } else {
//       alert(res.data.message);
//     }
//   }).catch((error) => {
//     console.log(error);
//   });
// }

// form.addEventListener('submit', login)
// sample
