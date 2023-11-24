class Slider{
    constructor({
        duration=1000,
        transition=4,
        autoplay=true,
        loop=true,
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
        <div id="${this.paginationId}"style="width:100%; display: flex; justify-content: center; margin-top:15px; z-index:-1"></div>
        </div>`
        
        this.content = sliderContainerStructure

        this.totalInnerWidthPer = innerSliderWidth
        this.maxScrollBack = this.totalInnerWidthPer-100
        this.initialLeft = 0

    }

    init({
        nav=false,
        page=false,
        pageSetting={
            active:`<div id="" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#666666; border-radius:100px;"></div>`,
            inactive:`<div id="" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#CBCBCB; border-radius:100px;"></div>`,
        },
        navSetting={
            Left: `Left`,
            Right: `Right`,
        }
    }){

        alert(this.containerId)

        document.getElementById(this.containerId).innerHTML = this.content
        let minus
        let paginationDots

        if(this.loop){
            setInterval(()=>{
                if(this.initialLeft!=this.maxScrollBack || this.initialLeft>this.maxScrollBack){
                    this.initialLeft = this.initialLeft+100
                }else if(this.looper){
                    this.initialLeft = 0;
                }
                minus = this.initialLeft!=0 ? "-" : ""
                document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"

                this.currentSlide = this.sliderNumber > this.currentSlide ? this.currentSlide+1 : 1
                
                if(page){
                    paginationDots=``
    
                        for(let i=1; i<=this.sliderNumber; i++){
                            if(this.currentSlide==(i)){
                                paginationDots += pageSetting.active
                            }else{
                                paginationDots += pageSetting.inactive
                            }
                        }
                        document.getElementById(this.paginationId).innerHTML=paginationDots
                    }

            }, this.duration)
        }
        
        if(page){
            paginationDots=``

                for(let i=1; i<=this.sliderNumber; i++){
                    if(this.currentSlide==(i)){
                        paginationDots += `<div id="pagi-${i}" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#666666; border-radius:100px;"></div>`
                    }else{
                        paginationDots += `<div id="pagi-${i}" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#CBCBCB; border-radius:100px;"></div>`
                    }
                }
                document.getElementById(this.paginationId).innerHTML=paginationDots
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
                if(this.initialLeft==0 && this.looper){
                    this.initialLeft=this.maxScrollBack 
                }else{
                    this.initialLeft=this.initialLeft-100
                }
                minus = this.initialLeft!=0 ? "-" : ""
                document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"
                
                this.currentSlide = this.sliderNumber == 1 ? this.sliderNumber : this.currentSlide-1

                if(page){

                
                    paginationDots=``

                    for(let i=1; i<=this.sliderNumber; i++){
                        if(this.currentSlide==(i)){
                            paginationDots += `<div id="pagi-${i}" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#666666; border-radius:100px;"></div>`
                        }else{
                            paginationDots += `<div id="pagi-${i}" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#CBCBCB; border-radius:100px;"></div>`
                        }
                    }
                    document.getElementById(this.paginationId).innerHTML=paginationDots
                }

            }
            
            document.getElementById(randomIdRight).onclick = () =>{
                if(this.initialLeft!=this.maxScrollBack || this.initialLeft>this.maxScrollBack){
                    this.initialLeft = this.initialLeft+100
                }else if(this.looper){
                    this.initialLeft = 0;
                }
                minus = this.initialLeft!=0 ? "-" : ""
                document.getElementById(this.innerSliderId).style.left=minus+this.initialLeft+"%"
                
                this.currentSlide = this.sliderNumber > this.currentSlide ? this.currentSlide+1 : 1

                if(page){
                paginationDots=``

                    for(let i=1; i<=this.sliderNumber; i++){
                        if(this.currentSlide==(i)){
                            paginationDots += `<div id="pagi-${i}" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#666666; border-radius:100px;"></div>`
                        }else{
                            paginationDots += `<div id="pagi-${i}" class="pagis" style="width: 15px; height: 15px; margin:0 5px; background:#CBCBCB; border-radius:100px;"></div>`
                        }
                    }
                    document.getElementById(this.paginationId).innerHTML=paginationDots
                }

            }
        }
        
    }

}

let slider = new Slider({
    "containerId": "ather",
    "autoplay":true,
    "loop":true,
    "duration": 8,
    "transition": 5,
    "content":[
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
    ],
    advanceSetting:{
        sliderWidthPercent:100
    }
})


slider.init({
    "nav": true,
    "page":true,
    "navSetting":{
        "Left": `<i class="fa-solid fa-chevron-left" style="font-size:250%;"></i>`,
        "Right": `<i class="fa-solid fa-chevron-right" style="font-size:250%;"></i>`,
    }
})










let slider2 = new Slider({
    "containerId": "shahid",
    "autoplay":true,
    "loop":true,
    "duration": 8,
    "transition": 5,
    "content":[
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
        `
            <div class="container">
                <p class="text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam hic minus quisquam voluptates dolorum debitis? Aperiam, dolores? Saepe debitis temporibus eius quod magni enim ducimus reiciendis quas eum in soluta ullam aut illo repudiandae totam doloribus corporis eos, vel officiis illum distinctio ipsa ipsum optio. Ea quidem exercitationem, pariatur provident, voluptate dolorem doloribus aliquid rerum minus nihil, sint dolore et perspiciatis est excepturi fugiat officiis aliquam officia architecto deserunt ut. Perferendis dolorem dolores aliquid, placeat vero quibusdam ullam voluptates possimus ."</p>
                <div class="w-100 d-flex mt-5 mb-3 justify-content-center">
                    <img src="https://freepngimg.com/save/148147-standing-smiling-business-man-free-photo/500x500" width="125px" height="125px" class="rounded-circle" alt="">
                </div>
                <p class="w-100 text-center mb-2">
                    <b>Akram Azab</b>
                </p>
                <p class="mb-4 text-center">English language instructor at Arab Academy for science, technology and maritime.</p>
                <div class="w-100 d-flex justify-content-center"><button class="btn btn-primary">View CV Sample</button></div>
            </div>
        `,
    ],
    advanceSetting:{
        sliderWidthPercent:100
    }
})

slider2.init({
    "nav": true,
    "page":true,
    "navSetting":{
        "Left": `<i class="fa-solid fa-chevron-left" style="font-size:250%;"></i>`,
        "Right": `<i class="fa-solid fa-chevron-right" style="font-size:250%;"></i>`,
    }
})