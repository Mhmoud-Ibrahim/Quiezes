export class Quiz{
    constructor(questions){
        this.questions=questions
        this.questionsLength= questions.length
        this.currentQuestion= 0;
        this.score=0;
        this.showQuestion();

        document.getElementById('next').addEventListener('click',this.nextQuestion.bind(this))
    }
     shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    showQuestion(){
        document.getElementById('question').innerHTML=this.questions[this.currentQuestion].question;
        document.getElementById('currentQuestion').innerHTML=this.currentQuestion+1;
        document.getElementById('totalNumberOfQuestions').innerHTML=this.questionsLength;
        let answer = [this.questions[this.currentQuestion].correct_answer,...this.questions[this.currentQuestion].incorrect_answers]
       this.shuffle(answer)
      
       let  temp=``;
        for(let i=0;i<answer.length;i++){
            temp+=`
            <div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer"  value="${answer[i]}">
               ${answer[i]}
            </label>
        </div>
            
            `
        }
        document.getElementById('rowAnswer').innerHTML= temp;
    }
    nextQuestion(){
        let correctAnswer =this.questions[this.currentQuestion].correct_answer;
        let userAnswer = Array.from(document.getElementsByName('answer')).filter(el=>el.checked)[0].value; 
    //    console.log(correctAnswer);
        this.checkAnswer(correctAnswer,userAnswer)
        this.currentQuestion++
        if(this.currentQuestion<this.questionsLength){
            this.showQuestion();
        }else{
            // console.log(this.score);
            $("#quiz").fadeOut(400,()=>{
                $("#finish").fadeIn(400)
                document.getElementById("score").innerHTML=this.score
                document.getElementById("tryBtn").addEventListener('click',()=>{
                    $("#finish").fadeOut(400,()=>{
                        $("#setting").fadeIn(400);
                    })
                })
            })
        } 
    }
    checkAnswer(correctAnswer,userAnswer){
        if(correctAnswer==userAnswer){
            this.score++
            
           $("#Correct").fadeIn(400).fadeOut(400);
        }
        else if(userAnswer=""){
             $('#alert').fadeIn(400).fadeOut(900)
        }else{
            $("#inCorrect").fadeIn(400).fadeOut(400);
        }
         
    }
}