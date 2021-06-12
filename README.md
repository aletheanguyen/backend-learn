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

Bước 2: Viết API thêm sửa xoá
Bước 3: Kết nối database
Bước 4: Xây dựng tính năng Đăng nhập 
Bước 5: Phân quyền

