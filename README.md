# backend-learn

* Data base là ứng dụng/phần mềm lưu trữ cơ sở dữ liệu
* Server là 1 cái máy tính, có thể cài nhiều phần mềm trong đó có ứng dụng phần mềm Database
* Backend và frontend cũng là 1 phần mềm và cùng đang cài trên server

FE hoàn toàn có thể kết nối thẳng Database.
Tuy nhiên khi code trên FE thì toàn bộ thông tin kết nối, thì bất kỳ ai cũng có thể F12 để thấy và truy cập => Tính bảo mật k tốt
=> BE ra đời như bước trung gian

Khi này BE và FE sẽ liên kết với nhau thông API (Application Protocol Interface)
=> BE sẽ thêm 1 bước để check phân quyền để đảm bảo mỗi người dùng chỉ được phép thao tác trên dữ liệu mà ng dùng đó được quyền sử dụng và k ảnh hưởng đến các dữ liệu khác trong Database

* Bên cạnh đó, BE sinh ra để hỗ trợ xử lý những tác vụ phức tạp như thao tác trên bảng ở DB để trả ra những số liệu thống kê

-------
Thực hành
Bước 1: Tạo 1 ứng dụng BE
```shell
    npm init
```
Sẽ tạo ra file package.json 
```json
{
  "name": "backend-learn",
  "version": "0.0.1",
  "description": "Learn backend",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/aletheanguyen/backend-learn.git"
  },
  "author": "aletheanguyen2629@gmail.com",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/aletheanguyen/backend-learn/issues"
  },
  "homepage": "https://github.com/aletheanguyen/backend-learn#readme"
}

```
=> Sau khi điền hết các thông tin thì bạn đã tạo thành công 1 ứng dụng NodeJS (NodeJS là ngôn ngữ nền tảng để chạy được ứng dụng JS)

- Mỗi ứng dụng sẽ có 1 file JS main (liên kết đến toàn bộ các file JS khác trong ứng dụng). Ở đây chính là file index.js => Bạn có thể nhận biết file main của 1 ứng dụng bằng cách đọc trong package.json:
```json
{"main": "index.js"}
```
=> Vì đây là ứng dụng NodeJS nên cách chạy ứng dụng sẽ có cú pháp như sau:
```shell
node src/index.js
```

Ngoài cách này, bạn có thể tự định nghĩa 1 lệnh ngắn để chạy ứng dụng bằng cách thêm đoạn code sau trong phần script ở file package.json
```json
{
     "start":"node src/index.js"
}
```
Tuy nhiên code trên JS sẽ không được hỗ trợ việc định nghĩa kiểu dữ liệu => không chặt chẽ về mặt cấu trúc dữ liệu
=> TS được sinh ra như 1 ngôn ngữ để hỗ trợ việc định nghĩa các model, interface để làm cho cấu trúc code được chặt chẽ hơn và có tính ràng buộc hơn
* Cách cài thư viện ts:
```shell
npm install typescript
```
Lúc này thư mục typescript sẽ xuất hiện trong folder node_modules
Để chuyển đổi APP JS hiện tại sang APP TS => cần chạy lệnh
```shell
npx tsc --init
```
Lúc này file tsconfig.json sẽ được tạo và chứa các lệnh cài đặt cho ứng dụng TS 

Sau khi chuyển đổi từ JS sang TS, bạn có thể đổi đuôi của file index từ index.js sang index.ts để định nghĩa được các interface mà k bị báo lỗi nữa

***=>*** Tuy nhiên, TS là ngôn ngữ để hỗ trợ người đọc hiểu dễ hơn chứ k phải dành cho máy đọc nên bất kì khi nào start project, luôn cần build file index.ts sang dạng index.js trước rồi mới npm start.

Lệnh để như sau:
```shell
npx tsc
```
=> Nếu thấy folder dist xuất hiện nghĩa là đã build thành công
=> Chuyển sang dạng câu lệnh trên package.json:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node dist/index.js",
    "build": "tsc"
  },
///Không cần define "npx tsc" vì trong file package.json, sẽ tự ngầm hiểu có npx
```
Nhưng việc build và start sẽ diễn ra rất thường xuyên nên để nhanh hơn, bạn có thể vừa build vừa run khi chạy lệnh npm start bằng cách sau
```json
"scripts": {
    "start": "npm run build; node dist/index.js",
  },
```

* Một số thư viện cần biết:
1. npm install ts-node
Như đã nói, để chạy 1 ứng dụng TS, luôn phải trải qua 2 bước build => run

Tuy nhiên, khi số lượng file nhiều lên việc start sẽ tốn rất nhiều tgian. Nên để tăng hiệu năng làm việc, , bạn có thể cài đặt thư viên
```shell
npm install ts-node
```
Thư viện này sẽ giúp, ứng dụng đọc thẳng từ file ts mà k cần chuyển đổi sang js.
Cách chạy lệnh như sau:
```shell
npx ts-node src/index.ts
```
Tuy nhiên, việc đọc trực tiếp file ts có 1 vài hạn chế nên thường chỉ sử dụng trong giai đoạn dev thôi nhé!
=> Để nhanh hơn, bạn nên định nghĩa lệnh này trên file package.json luôn nhé:

2. npm install nodemon
Nodemon là thư viện giúp tự động chạy các lệnh khi lắng nghe được sự thay đổi trên những file bạn đã định nghĩa.
```shell
npm install nodemon
```
Với thư viện này bạn phải tự tạo tay 1 file có tên: nodemon.json cùng nội dung file như sau nhé:
```json

{
    "watch": ["src"], // danh sách thư mục bạn muốn lắng nghe
    "ext": "ts,json", // các định dạng file bạn cần lắng nghe trong thư mục
    "ignore": ["src/**/*.spec.ts"], // danh sách file k cần lắng nghe
    "exec": "ts-node ./src/index.ts" // danh sách lệnh bạn muốn thực hiện khi có sự thay đổi trên các file đã chỉ định
  }
  ```
Để nodemon được thực hiện việc lắng nghe, bạn phải khởi tạo nó bằng lệnh
```shell
npx nodemon
```
Tuy nhiên, việc đọc trực tiếp file ts có 1 vài hạn chế nên thường chỉ sử dụng trong giai đoạn dev thôi nhé!
=> Để nhanh hơn, bạn nên định nghĩa lệnh này trên file package.json luôn nhé!
Ex:
```json
"scripts": {
    "start-dev": "nodemon",
  },
  ```
Bước 2: Viết API
Để viết API, mình sẽ sử dụng 2 thư viện Express và body-parser bằng câu lệnh sau:
```shell
npm install express @types/express --save
npm install body-parser
```
Sau đó bạn dán đoạn code sau vào file index.ts
```json
const express = require('express')
const app = express()
// Đây là nơi để bạn viêt API nhé
})
app.listen(your-port)
```
Các API sẽ có dạng như sau:
```json
app.get('/', function (req, res) {res.send('Hello World')})
///method get ; trả về nội dung Hello world
```
=> Trong bài này, mình đang viết API thêm sửa xoá cho 1 sp (Tham khảo bên file index nhé)!
`Bước 1`: Tạo 1 mảng danh sách products
`Bước 2`: Viết API chuẩn METHOD để:
- Trả về danh sách sản phẩm bằng method GET
- Thêm 1 sản phẩm vào danh sách bằng method POST
- Cập nhật 1 sản phẩm vào danh sách bằng method PUT
- Xoá 1 sản phẩm khỏi danh sách bằng method DELETE

=> Cú pháp viết như viết 1 hàm thông thường thôi!

*** Để chạy thử API vừa tạo, bạn đừng quên cài POSTMAN trên máy nhé!
Link cài https://www.postman.com/downloads/
=> Hướng dẫn chạy API cơ bản trên POSTMAN

Bước 3: Kết nối database MOGO
- Để cài đặt mogo trước tiên bạn phải có Docker trên máy nhé!
Link https://www.docker.com/get-started

Khi đã có docker, bạn khởi tạo 1 máy ảo để chạy database - mongo theo lệnh sau:
```shell
docker run --name test-backend --port 37017:27017   -d mongo
```
Trong đó: 
+ test-backend => là tên máy ảo để run mogodb
+ 27017 => là port mặc định của máy ảo Docker tạo ra để bạn kết nối
+ 37017 => là port trên máy của bạn và bạn mong muốn kết nối nó với port 27017 ở trên

Tiếp theo, bạn sẽ kết nối project hiện tại với database mongo bằng cách cài đặt mongo qua cú pháp:
```shell
npm install mongodb @types/mongodb --save
```
Sau khi cài đặt xong đừng quên copy nhanh đoạn code này vào file index/ts nhé!:
```json
import { MongoClient } from "mongodb"
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:37017';

// Database Name
const dbName = 'hai-test-backend';
const client = new MongoClient(url);
// Use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    // Định nghĩa API ở đây nhé!
    let port = 3000;
    app.listen(port)
}
```


Bước 4: Xây dựng tính năng Đăng nhập 
Bước 5: Phân quyền

