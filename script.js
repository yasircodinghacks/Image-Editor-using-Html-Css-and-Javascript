choosebtn=document.querySelector(".choosebtn")
getfile=document.querySelector(".getfile")
seconddiv=document.querySelector(".seconddiv")
options=document.querySelectorAll(".options button")
filterlable=document.querySelector(".filterlable h1")
filterslider=document.querySelector(".filterslider")
filterpercentage=document.querySelector(".filterpercentage")
imageclass=document.querySelector(".seconddiv img")
filprotate=document.querySelectorAll(".filprotate button")
reset=document.querySelector(".reset")
saveImage=document.querySelector(".saveimage")
maincontainner=document.querySelector(".maincontainner")

brightness=100,saturation=100,inversion=0,grayscale=0,rotate=0,fliphorizontal=1,flipvertical=1;

// upload and load image
choosebtn.onclick=()=>{
    getfile.click()
    getfile.oninput=()=>{
        file=getfile.files[0]
        imageclass.src=URL.createObjectURL(file)
        maincontainner.classList.remove("disable")
    }
}
// active button ,slider control and slider label 
options.forEach(element => {
    element.onclick=()=>{
        document.querySelector(".active").classList.remove("active")
        element.classList.add("active")
        filterlable.innerText=element.innerText
        if (element.id==="brightness") {
            filterslider.value=brightness
            filterpercentage.innerText=`${filterslider.value}%`
        }else if (element.id==="saturation") {
            filterslider.value=saturation
            filterpercentage.innerText=`${filterslider.value}%`
            
        }else if (element.id==="inversion") {
            filterslider.value=inversion
            filterpercentage.innerText=`${filterslider.value}%`
            
        }else{
            filterslider.value=grayscale
            filterpercentage.innerText=`${filterslider.value}%`
        }
    }
});


// applyfilters on image 
applyfilter=()=>{
    imageclass.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale})`
    imageclass.style.transform=`rotate(${rotate}deg) scale(${fliphorizontal},${flipvertical})`

}
filterslider.oninput=()=>{
    filterpercentage.innerText=`${filterslider.value}%`
    selectedfilter=document.querySelector(".active")
    if (selectedfilter.id==="brightness") {
        brightness=filterslider.value
    } else if(selectedfilter.id==="saturation"){
        saturation=filterslider.value
    } else if(selectedfilter.id==="inversion"){
        inversion=filterslider.value
    } else{
        grayscale=filterslider.value
    }
    applyfilter()
}
filprotate.forEach(fr=>{
    fr.onclick=()=>{
        if (fr.id==="left") {
            rotate-=90
        }else if(fr.id==="right"){
            rotate+=90
        }else if(fr.id==="horizontal"){
            if(fliphorizontal===1){
                fliphorizontal=-1
            }else{fliphorizontal=1}
        }else if(fr.id==="vertical"){
            if(flipvertical===1){
                flipvertical=-1
            }else{
                flipvertical=1
            }
        }
        applyfilter()
    }
    
})

// reset filters 
reset.onclick=()=>{
    brightness=100,saturation=100,inversion=0,grayscale=0,rotate=0,fliphorizontal=1,flipvertical=1;
    applyfilter()
    options[0].click()
}

// save image 
saveImage.onclick=()=>{
    canvas=document.createElement("canvas")
    ctx=canvas.getContext("2d")
    canvas.width=imageclass.naturalWidth
    canvas.height=imageclass.naturalHeight
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale})`
    ctx.translate(canvas.width/2 , canvas.height/2)
    if (rotate!=0) {
        ctx.rotate(rotate*Math.PI/180)
        
    }
    ctx.scale(fliphorizontal,flipvertical)
    ctx.drawImage(imageclass,-canvas.width/2,-canvas.height/2, canvas.width ,canvas.height)
    link=document.createElement("a")
    link.download="Muhammad Yasir Hussain"
    link.href=canvas.toDataURL()
    link.click()
}
