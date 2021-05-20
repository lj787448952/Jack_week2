
const app = {
    data: {
        apiUrl: 'https://vue3-course-api.hexschool.io/api',
        // 站台名稱
        apiPath: 'lj787448952',
        // 個人路徑名稱
        products: [],
        // 給之後串接的api內容空陣列
    },
    getData(page = 1) {
        const url = `${this.data.apiUrl}/${this.data.apiPath}/products?page=${page}`;
        // 取得api 
        axios.get(url).then((res) => {
            if (res.data.success) {
                console.log(res)
                this.data.products = res.data.products;
                this.render(this.data.products);
            } else {
                alert('您尚未登入，請重新登入。');
                window.location = 'signin.html';
            }
        })
    },
    deleteData(e) {
            const { id } = e.target.dataset;
            const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/product/${id}`;
            if (window.confirm('你確定要刪除嗎？')) {
            axios.delete(url).then((res) => {
                if (res.data.success) {
                    console.log(res)
                    alert(res.data.message)
                    this.getData();
                }
            });
        }
    },
    addData(){
        const product={
            data:{
                title: 'test',
                category:  'clothes',
                origin_price:  1000,
                price: 100,
                unit: '件',
                description: 'design by Jack',
                content: 'good good',
                is_enabled: 1,
                imageUrl: '',
            },
        }
        axios.post(`${this.data.apiUrl}/${this.data.apiPath}/admin/product`,product)
            .then((res)=>{
                console.log(res);
            });
    },

    render(data){
        const el = document.querySelector('#productList');
        const productCount = document.querySelector('#productCount');
        const addBtn = document.querySelector('.addBtn');
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        let str = '';
        
        this.data.products.forEach((item) => {
            str += `
            <tr>
            <td>${item.title}</td>
            <td width="120">${item.origin_price}</td>
            <td width="120">${item.price}</td>
            <td width="100"><span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span></td>
            <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}">刪除</button>
                <button type="button" class="btn btn-sm btn-outline-danger move addBtn" data-action="add" data-id="${item.id}">新增</button>
            </td>
            <tr>`;
        });
        el.innerHTML = str;
        productCount.textContent = this.data.products.length;

        
        deleteBtn.forEach((item) => {
            item.addEventListener('click', this.deleteData.bind(this));
        });

        

    },
        created() {
    //token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.getData();
}

}

app.created();




// sample
//參考物件架構
// const app = {
//     data: {
//       apiUrl: 'https://vue3-course-api.hexschool.io/api',
//       apiPath: 'jarvis',
//       products: [],
//     },
//     getProducts(page = 1) {
//       const url = `${this.data.apiUrl}/${this.data.apiPath}/products?page=${page}`;
//       axios.get(url).then((res) => {
//         if (res.data.success) {
//           this.data.products = res.data.products;
//           this.renderProduct(this.data.products);
//         } else {
//           alert('您尚未登入，請重新登入。');
//           window.location = 'login.html';
//         }
//       })
//     },
//     deleteProduct(e) { //參考範例
//         const { id } = e.target.dataset;
//         const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/product/${id}`;


//         if (window.confirm('確定要刪除此商品嗎？')) {  
//             axios.delete(url).then((res) => {
//             if (res.data.success) {
//                 alert(res.data.message)
//                 this.getProducts();
//             }
//             });
//         }
//     },
//     renderProduct(data) {
//       const productList = document.querySelector('#productList');
//       const productCount = document.querySelector('#productCount');
  
//       let str = '';
//       data.forEach((item) => {
//         str += `
//           <tr>
//             <td class="d-flex align-items-start">
//             <img class="img-size me-3" src="${item.imageUrl}" alt="${item.title}">
//             <div class="d-flex flex-column">
//                 <h4>${item.title}</h4>
//                 <span>${item.description}</span>
//             </div>
//             </td>
//             <td  width="120">${item.num}</td>
//             <td  width="120">
//               ${item.origin_price}
//             </td>
//             <td  width="120">
//               ${item.price}
//             </td>
//             <td  width="100">
//             <div class="form-check form-switch">
//                 <input class="form-check-input checkBox" type="checkbox" id="${item.id}" ${item.is_enabled? 'checked': ''} data-action="status" data-id="${item.id}">
//                 <label class="form-check-label" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>
//             </div>
//             </td>
//             <td  width="120">
//             <a href="#" class="deleteBtn text-gray"><span class="material-icons" data-action="remove" data-id="${item.id}">delete</span></a> 
//             </td>
//           </tr>`;
//       });
//       productList.innerHTML = str;
//       productCount.textContent = this.data.products.length;
  
//       const deleteBtn = document.querySelectorAll('.deleteBtn');
//       const checkBox =  document.querySelectorAll('.checkBox');

//       deleteBtn.forEach((item) => {  //參考範例
//         item.addEventListener('click', this.deleteProduct.bind(this));
//       });
//       checkBox.forEach(item=>{
//         item.addEventListener('click', this.useComponents.bind(this))
//       });
//     },
//     activeProduct(id){
//         this.data.products.forEach(item=>{
//           if(id == item.id){
//             item.is_enabled = !item.is_enabled
//           }
//         })
//         this.renderProduct(this.data.products)
//     },
//     useComponents(e){
//         const action = e.target.dataset.action;
//         const {id} = e.target.dataset;
//         if (action === 'status') {
//             this.activeProduct(id);
//         }
//     },
//     created() { //參考範例
//       const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
//       axios.defaults.headers.common.Authorization = token;
//       this.getProducts();
//     }
//   }
  
//   app.created();
// sample
