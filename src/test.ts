export default class Test {

    id : string = "1";
    private name : string = "hello";
    
    
    foo(){
        console.log("this is public");
    }

    private bar() {
        console.log("this is private");
    }

}


