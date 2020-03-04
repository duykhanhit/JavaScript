var readlineSync = require('readline-sync');
var fs = require('fs');

var contacts = [];

function loadData(){
  contacts = fs.readFileSync('./data.json', 'utf8');
  contacts = JSON.parse(contacts);
}

function pushData(){
  var data = JSON.stringify(contacts);
  fs.writeFileSync('./data.json', data, 'utf8');
}

function inputData(){
  var name = readlineSync.question('Nhập tên: ');
  var phoneNumber = readlineSync.question('Nhập SĐT: ');
  var newContact = {
    name: name,
    phoneNumber: phoneNumber
  }
  contacts.push(newContact);
  pushData();
}

function editData(){
  var editName = readlineSync.question('Nhập tên muốn sửa: ');
  for(var i = 0; i < contacts.length; i++){
    if(contacts[i].name === editName){
      contacts[i].name = readlineSync.question('Nhập tên mới: ');
      contacts[i].phoneNumber = readlineSync.question('Nhập SĐT mới: ');
    }
  }
  pushData();
}

function deleteData(){
  var deleteName = readlineSync.question('Nhập tên muốn xóa: ');
  for(var i = 0; i < contacts.length; i++){
    if(contacts[i].name === deleteName){
      contacts.splice(i, 1);
    }
  }
  pushData();
}

function findContact(){
  console.log('1. Tìm theo tên.');
  console.log('2. Tìm theo SĐT.');
  var op = readlineSync.question('Chọn cách: ');
  switch(op){
    case '1':
      findByName();
      break;
    case '2':
      findByPhoneNumber();
      break;
    default:
      console.log('Chọn sai rồi...');
      break;
  }
}

function findByName(){
  var findName = readlineSync.question('Nhập tên cần tìm: ');
  var i = 0;
  for(var contact of contacts){
    if(contact.name.toLowerCase() === findName.toLowerCase()){
      console.log(contact.name, contact.phoneNumber);
    }else{
        i++;
    }
  }
  if(i === contacts.length){
    console.log('Không tìm thấy.');
  }
}

function findByPhoneNumber(){
  var i = 0;
  var findNumber = readlineSync.question('Nhập SĐT cần tìm: ');
  for(var contact of contacts){
    if(contact.phoneNumber.match(findNumber)){
      console.log(contact.name, contact.phoneNumber);
    }else{
        i++;
    }
  }
  if(i === contacts.length){
    console.log('Không tìm thấy.');
  }
}

function showMenu(){
  console.log('1. Nhập dữ liệu contact.');
  console.log('2. Sửa dữ liệu contact.');
  console.log('3. Xóa contact.');
  console.log('4. Tìm contact.');

  var option = readlineSync.question('Nhập lựa chọn: ');
  switch(option){
    case '1':
      inputData();
      showMenu();
      break;
    case '2':
      editData();
      showMenu();
      break;
    case '3':
      deleteData();
      showMenu();
      break;
    case '4':
      findContact();
      showMenu();
      break;
    default:
      showMenu();
      break;
  }
}

function main(){
  loadData();
  showMenu();
}

main();