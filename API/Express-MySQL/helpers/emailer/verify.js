const verify=(username,password,email,kode)=>{
    return{
            from: '"Minamo Toys and Hobbies" <minamotoysjogja@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verification Email ✔", // Subject line
            // text: "Hello world?", // plain text body
            html: `<h1>Selamat Datang di Minamo Toys and Hobbies</h1>
            <h2><b>Kode Verifikasi anda : ${kode}</b></h2>
            <h2>Klik Link <a href="http://localhost:3000/verify?username=${username}&password=${password}">ini</a> untuk mengaktifkan akun </h2>` // html body
    }
}
module.exports=verify