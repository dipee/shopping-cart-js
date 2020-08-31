//variables 
const cources = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');


// listners 
loadEventListeners();

function loadEventListeners(){
    // when a new cource is added 
    cources.addEventListener('click', buyCourse);
    //when the remove button is clicked 
    shoppingCartContent.addEventListener('click', removeCourse);
    //when clear cart button is clicked 
    clearCartBtn.addEventListener('click', clearCart);
    //document ready 
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}
//functions
function buyCourse(e){
    e.preventDefault();
    //use delegation to find the course that was added 
    if(e.target.classList.contains('add-to-cart')){
        //read the currosponding values
        const course = e.target.parentElement.parentElement;
        //read the values from the course 
        getCourseInfo(course);

    }
}
function getCourseInfo(course){
    //create an object with course data 
    const courseInfo = {
        image : course.querySelector('img').src,
        title : course.querySelector('h4').textContent,
        price : course.querySelector('.price span').textContent,
        id : course.querySelector('a').getAttribute('data-id')
    }
    // insert into the shopping cart 
    addIntoCart(courseInfo);

}
//display the selected course in the shopping cart 
function addIntoCart(course){
    //create a <tr>
    const row = document.createElement('tr');

    // build a template 
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>
                ${course.title}
            </td>
            <td>
                ${course.price}
            </td>
            <td>
               <a href="#" class="remove" data-id="${course.id}"> X </a>
            </td>
        </tr>
    `;
    // add into the shopping cart 
    shoppingCartContent.appendChild(row);
    //add course info in local storage
    saveIntoStorage(course);
}
// add the courses into local storage 
function saveIntoStorage(course){
    let courses = getCoursesFromStorage();
    //add the course into the arry 
    courses.push(course);
    //since storage only saves strings, we need to convert JSON to strings
    localStorage.setItem('courses', JSON.stringify(courses));
}
// get courses from local sotrage
function getCoursesFromStorage(){
    let courses;
    // if something exists on storage we get the value otherwise create an empty array
    if(localStorage.getItem('courses')===null){
        courses = [];
    }
    else{
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses; 
}
//remove course frrom the DOM 
function removeCourse(e){
    let course, courseId;
    //remove item form the DOM 
    if(e.target.classList.contains('remove'))
    {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    //remove item form the Local storage 
    removeCourseLocalStorage(courseId);

}
// remove item from local storage 
function removeCourseLocalStorage(id){
    // get the local storage data 
    let coursesLS = getCoursesFromStorage();
    //loop through the array and find the index to remove 
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index,1);
        }
    });
    //add the rest of the array 
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}
//clear the shopping cart 
function clearCart(){
    // shoppingCartContent.innerHTML=''; OR 
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //clear from local storage 
    clearLocalStorage();
}
//clears the whole local storage 
function clearLocalStorage(){
    localStorage.clear();
}
// leads when document is ready and print courses into the shopping cart 
function getFromLocalStorage(){
    let coursesLS = getCoursesFromStorage();
    // loop throught the courses and print into the cart 
    coursesLS.forEach(function(course){
        //create a <tr>
        const row = document.createElement('tr');
            //print the content
            row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>
                    ${course.title}
                </td>
                <td>
                    ${course.price}
                </td>
                <td>
                   <a href="#" class="remove" data-id="${course.id}"> X </a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });

}