import { Quiz } from "./Quiz.js";
export class settings{
    constructor(){
        this.categoryElement = document.getElementById('category');
        this.difficultyElement = document.getElementsByName('difficulty')
        this.numberElement = document.getElementById('numberOfQuestions')
        document.getElementById('startBtn').addEventListener('click',this.startQuiz.bind(this))
        // console.log('hello');
    }

    async  startQuiz(){
        let category = this.categoryElement.value
        let difficulty = [...this.difficultyElement].filter((el)=>el.checked)[0].value
        let amount = this.numberElement.value
        let Api = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
        let questions=await this.fechApi(Api)
        if(questions.length>0){
            let quiz = new Quiz(questions);

            $('#setting').fadeOut(400,()=>{
                $('#quiz').fadeIn(400)
            })
        }
       
    }

    async fechApi(api){
        let response =await fetch(api)
        let finalresult =await response.json();
        return finalresult.results
    }
}
