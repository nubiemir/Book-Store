document.addEventListener("click",(e)=>{
    const target = e.target;
    if(e.target.classList.contains("more--btn")){
        const element = document.getElementsByClassName("coupon")[0]
        element.style.display = "flex";
        target.classList.remove("more--btn")
        target.firstChild.classList.remove("fa-plus")
        target.firstChild.classList.add("fa-minus")
        target.classList.add("less--btn")
    }else if (e.target.classList.contains("less--btn")){
        const element = document.getElementsByClassName("coupon")[0]
        element.style.display = "none";
        target.classList.remove("less--btn")
        target.firstChild.classList.remove("fa-minus")
        target.firstChild.classList.add("fa-plus")
        target.classList.add("more--btn")
    }else if(e.target.classList.contains("collapse")){
        const element = e.target;
        const parent = element.parentElement.parentElement
        const lastChild = parent.lastElementChild
        lastChild.style.display = "none"
        element.classList.remove("collapse")
        element.classList.remove("fa-minus")
        element.classList.add("expand")
        element.classList.add("fa-plus")
    }else if(e.target.classList.contains("expand")){
        const element = e.target;
        const parent = element.parentElement.parentElement
        const lastChild = parent.lastElementChild
        lastChild.style.display = "flex"
        element.classList.add("collapse")
        element.classList.add("fa-minus")
        element.classList.remove("expand")
        element.classList.remove("fa-plus")
    }
})



