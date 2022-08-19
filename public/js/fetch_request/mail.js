function requestMail() {
    let headersList = {
        "Accept": "*/*",
        "token": localStorage.acesstoken,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    fetch("/member/email/send", {
        method: "PUT",
        headers: headersList
    }).then(async function(response) {
        if (response.status === 200) {
            const result = response.text();
            const data = JSON.parse(result);
            if (data.code) {
                Swal.fire({
                    icon: 'success',
                    title: "已重新發送新的驗證碼",
                    text: "請確認發送的郵件是否被歸類為垃圾郵件"
                });
            } else Swal.fire({
                icon: 'error',
                title: data.status,
                text: data.result
            });
        } else if (response.status === 403 && localStorage.refresh_token) {
            await getToken();
            return requestMail();
        } else {
            localStorage.clear();
            window.location.href = '/admin/login?redirct=' + location.pathname;
        }
    });
}