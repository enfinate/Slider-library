class Slider{
    constructor({
        duration=1000,
        transition=4,
        autoplay=false,
        loop=false,
        content=[],
        containerId="",
        advanceSetting={
            sliderWidthPercent:100
        }
    }){

        this.duration=duration*1000
        this.loop=autoplay
        this.looper=loop
        this.containerId = containerId

        this.currentSlide = 1
        this.sliderNumber = content.length

        let innerSliderWidth = content.length*100
        let outerSliderWidth = advanceSetting.sliderWidthPercent

        this.OuterSliderId = "custom-slider-element"+Math.random()
        this.innerSliderId = "custom-slider-element-inner"+Math.random()
        this.paginationId = "pagination-area"+Math.random()

        let sliderContainerStructure = `<div id="${this.OuterSliderId}" style="width:${outerSliderWidth}%; overflow: hidden"><div id="${this.innerSliderId}" style="transition:.${transition}s;width: ${innerSliderWidth}%; display: flex; position: relative; left:0;">`
        content.forEach(e => sliderContainerStructure+= e)
        sliderContainerStructure+=`
        </div>
        </div>
        <div id="${this.paginationId}"style="width:100%; display: flex; justify-content: center; margin-top:15px; z-index:-1"></div>
        `
        
        this.content = sliderContainerStructure

        this.totalInnerWidthPer = innerSliderWidth
        this.maxScrollBack = this.totalInnerWidthPer-100
        this.initialLeft = 0
        
    }

    init({
        nav=false,
        page=false,
        pageSetting={
            active:`<div id="inner-active"></div>`,
            inactive:`<div id="inner-inactive"></div>`,
        },
        navSetting={
            Left: `Left`,
            Right: `Right`,
        }
    }){

        this.pageSettingActive = pageSetting.active
        this.pageSettingInactive = pageSetting.inactive

        document.getElementById(this.containerId).innerHTML = this.content

        let minus
        let paginationDots
        this.loopContinue = true

        if(this.loop){
            setInterval(()=>{
                if(this.loopContinue){

                    if(this.initialLeft!=this.maxScrollBack || this.initialLeft>this.maxScrollBack){
                        this.initialLeft = this.initialLeft+100
                    }else if(this.looper){
                        this.initialLeft = 0;
                    }
                    minus = this.initialLeft!=0 ? "-" : ""
                    document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"
    
                    
                    if(!(this.looper) && this.currentSlide == this.sliderNumber-1){
                        this.loopContinue=false
                    }
    
                    this.currentSlide = this.sliderNumber > this.currentSlide ? this.currentSlide+1 : 1
    
                    if(page){
                        paginationDots=``
                        for(let i=1; i<=this.sliderNumber; i++){
                            if(this.currentSlide==(i)){
                                paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.active+`</span>`
                            }else{
                                paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.inactive+`</span>`
                            }
                        }
                        document.getElementById(this.paginationId).innerHTML=paginationDots
                        this.navWorkin(page)
                    }
                }
            }, this.duration)
        }
        
        if(page){              
            paginationDots=``
            for(let i=1; i<=this.sliderNumber; i++){
                if(this.currentSlide==(i)){
                    paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.active+`</span>`
                }else{
                    paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.inactive+`</span>`
                }
            }
            document.getElementById(this.paginationId).innerHTML=paginationDots
            this.navWorkin(page)
        }

        if(nav){
            let offsetHeightOfElement = document.getElementById(this.OuterSliderId).offsetHeight

            let randomIdLeft= "toTheLeftSlide"+Math.random();
            let randomIdRight= "toTheRightSlide"+Math.random();
    
            let containerStyle = `height:${offsetHeightOfElement}px; background: transparent; margin-top:-${offsetHeightOfElement}px; display: flex; align-items: center; padding:0 20px;`
    
            document.getElementById(this.OuterSliderId).innerHTML+=`
                <div style="width:100%; height:0px; background:rgba(0,0,0,1); margin-top:0px;position: relative; z-index:20; display: flex; justify-content: space-between">
                    <div style="${containerStyle}">
                        <span id="${randomIdLeft}">
                            ${navSetting.Left}
                        </span>
                    </div>
                    <div style="${containerStyle}">
                        <span id="${randomIdRight}">
                            ${navSetting.Right}
                        </span>
                    </div>
                </div>
            `

            document.getElementById(randomIdLeft).onclick = () =>{
                if(!(this.looper)){
                    if(this.initialLeft!=0){
                        this.initialLeft = this.initialLeft==0 && this.looper ? this.maxScrollBack : this.initialLeft-100
                        minus = this.initialLeft!=0 ? "-" : ""
                        document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"
                        this.currentSlide = this.sliderNumber == 1 ? this.sliderNumber : this.currentSlide-1
                        this.currentSlide = this.currentSlide < 1 ? this.sliderNumber : this.currentSlide
                        if(page){
                            paginationDots=``
                            for(let i=1; i<=this.sliderNumber; i++){
                                if(this.currentSlide==(i)){
                                    paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.active+`</span>`
                                }else{
                                    paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.inactive+`</span>`
                                }
                            }
                            if(this.loopContinue==false){
                                this.loopContinue=true
                            }
                            document.getElementById(this.paginationId).innerHTML=paginationDots
                            this.navWorkin(page)
                        }
                    }

                }else{
                    this.initialLeft = this.initialLeft==0 && this.looper ? this.maxScrollBack : this.initialLeft-100
                    minus = this.initialLeft!=0 ? "-" : ""
                    document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"
                    this.currentSlide = this.sliderNumber == 1 ? this.sliderNumber : this.currentSlide-1
                    this.currentSlide = this.currentSlide < 1 ? this.sliderNumber : this.currentSlide
                    if(page){
                        paginationDots=``
                        for(let i=1; i<=this.sliderNumber; i++){
                            if(this.currentSlide==(i)){
                                paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.active+`</span>`
                            }else{
                                paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.inactive+`</span>`
                            }
                        }
                        if(this.loopContinue==false){
                            this.loopContinue=true
                        }
                        document.getElementById(this.paginationId).innerHTML=paginationDots
                        this.navWorkin(page)
                    } 
                }
            }
            
            document.getElementById(randomIdRight).onclick = () =>{
                
                if(this.loopContinue){
                    
                    if(!(this.looper) && this.currentSlide == this.sliderNumber-1){
                        this.loopContinue=false
                    }

                    this.initialLeft = this.initialLeft!=this.maxScrollBack || this.initialLeft>this.maxScrollBack ? this.initialLeft+100 : 0
                    minus = this.initialLeft!=0 ? "-" : ""
                    document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"
                    this.currentSlide = this.sliderNumber > this.currentSlide ? this.currentSlide+1 : 1
                    if(page){
                        paginationDots=``
                        for(let i=1; i<=this.sliderNumber; i++){
                            if(this.currentSlide==(i)){
                                paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.active+`</span>`
                            }else{
                                paginationDots += `<span id="pagi-${i}" class="everyPage">`+pageSetting.inactive+`</span>`
                            }
                        }
                        document.getElementById(this.paginationId).innerHTML=paginationDots                
                        this.navWorkin(page)
                    }
                }
            }
        }  

        if(page){
            if(pageSetting.active==`<div id="inner-active"></div>`){
                document.getElementById('inner-active').style.cursor = "pointer"
                document.getElementById('inner-active').style.width = "30px"
                document.getElementById('inner-active').style.height = "4px"
                document.getElementById('inner-active').style.borderRadius = "20px"
                document.getElementById('inner-active').style.backgroundColor = "#666666"
                document.getElementById('inner-active').style.margin = "1px"
            }
            if(pageSetting.inactive==`<div id="inner-inactive"></div>`){   
                document.getElementById('inner-inactive').style.cursor = "pointer"
                document.getElementById('inner-inactive').style.width = "30px"
                document.getElementById('inner-inactive').style.height = "4px"
                document.getElementById('inner-inactive').style.borderRadius = "20px"
                document.getElementById('inner-inactive').style.backgroundColor = "#CBCBCB"
                document.getElementById('inner-inactive').style.margin = "1px"
            }
        }

    }

    navWorkin(page){
        if(page){
            document.querySelectorAll(".everyPage").forEach((e)=>{
                e.onclick=()=>{

                    e.style.cursor = `pointer`
                    let pagiSelect = parseInt((e.getAttribute("id")).split("-")[1])
    
                    this.currentSlide = pagiSelect
                    this.initialLeft = (pagiSelect*100)-100
                    
                    let paginationDots=``
                    for(let i=1; i<=this.sliderNumber; i++){
                        if(this.currentSlide==(i)){
                            paginationDots += `<span id="pagi-${i}" class="everyPage">`+this.pageSettingActive+`</span>`
                        }else{
                            paginationDots += `<span id="pagi-${i}" class="everyPage">`+this.pageSettingInactive+`</span>`
                        }
                    }
                    document.getElementById(this.innerSliderId).style.left="-"+this.initialLeft+"%"
                    document.getElementById(this.paginationId).innerHTML=paginationDots
                    
                    if(!this.looper){
                        if(pagiSelect == this.sliderNumber){
                            this.loopContinue=false
                        }else{
                            this.loopContinue=true
                        }
                    }
                    this.recallMeasure(page)
                }
            })
        }
    }

    recallMeasure(page){
        if(page){
            document.querySelectorAll(".everyPage").forEach((e)=>{
                e.onclick=()=>{
                    e.style.cursor = `pointer`
                    let pagiSelect = parseInt((e.getAttribute("id")).split("-")[1])
    
                    this.currentSlide = pagiSelect
                    this.initialLeft = (pagiSelect*100)-100
                    
                    let paginationDots=``
                    for(let i=1; i<=this.sliderNumber; i++){
                        if(this.currentSlide==(i)){
                            paginationDots += `<span id="pagi-${i}" class="everyPage">`+this.pageSettingActive+`</span>`
                        }else{
                            paginationDots += `<span id="pagi-${i}" class="everyPage">`+this.pageSettingInactive+`</span>`
                        }
                    }
                    document.getElementById(this.innerSliderId).style.left="-"+this.initialLeft+"%"
                    document.getElementById(this.paginationId).innerHTML=paginationDots
                    
                    if(!this.looper){
                        if(pagiSelect == this.sliderNumber){
                            this.loopContinue=false
                        }else{
                            this.loopContinue=true
                        }
                    }

                    this.navWorkin(page)
                }
            })
        }
    }
}

/**
     * This is library is created by https://athershahid.com 
     * Feel free to use it in your web/applications
     * Note: this library will constantly be updating.
 */