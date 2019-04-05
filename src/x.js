const div = onClickMyFunction => ({
  onClick: onClickMyFunction
});

const mojDiv = div(); // <div />

// w srodku diva, nie masz kontroli nad tym, gdy ktos kliknie diva, dzieje sie:
const event = { target: { value: "x" } };
typeof mojDiv.onClick === "function" ? mojDiv.onClick(event) : null;
// -------------------------------------------------------------

const mojDiv2 = div(() => console.log("x")); // <div onClick={() => console.log('x')} />
const mojDiv3 = div(console.log); // <div onClick={console.log} />

const myFunc = function myFunc() {
  console.log("myFunc");
};
console.log(myFunc);
const x = e => myFunc(e, 1, 2, 213123);
// <div onClick={myFunc} /> === <div onClick={e => myFunc(e)} /> === <div onClick={x} />
//
