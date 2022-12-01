export let users = []; //저장되있는 유저 정보 객체들. 새로고침 하거나 서버 종료시 초기화됨
export let currentUser; //현재 로그인한 유저 정보 객체 {id : ~, password : ~}

//로그인 & 로그아웃-----------------------------------
export const login = (userObj) => {
    const {id} = userObj
    const {password} = userObj;
    for(let i=0; i<users.length; i++)
    {
        const savedUser = users[i];
        if(savedUser.id === id) 
        {
            if(savedUser.password === password)
            {
                currentUser = userObj;
                return true;
            }
        }
    }
    return false;
}

export const logout = () => {
    currentUser = null;
}

//현재 유저 가져오기 & 로그인 상태 확인-----------------------------------
export const getCurrentUser = () => {
    return currentUser;
}

export const isUserLoggedIn = () => {
    return currentUser == null ? false : true;
}

//유저 저장 & 유저 가져오기-----------------------------------
export const setUser = (newUser) => { //유저 객체를 받아서
    users.push(newUser); //users에 저장
}

export const getUser = (id) => { //이름을 받아서
    let user = findUser(id); //중복 이름을 가진 유저를 찾음
    return user; //유저 반환
}

//유저 찾는 함수-----------------------------------
export const findUser = (findId) => { //이름을 받아서
    for(let i=0; i<users.length; i++) //users 길이 만큼
    {
        const savedUser = users[i]; //유저 객체 하나씩 꺼내서
        if(savedUser.id === findId) //비교하고
        {
            return savedUser; //중복된 이름이면 그 유저객체 반환
        }
    }
    return null; //없으면 null반환
}

//유저 DB 존재 유무 검사 & 새 DB 생성-----------------------------------
export const checkUserDBExists = (id) => {
    return JSON.parse(localStorage.getItem(id));
}

export const makeUserDB = (id) => {
    const newDB = {
        wishlist : [], 
        cartlist : [],
        purchaselist : [],
    };
    localStorage.setItem(id, JSON.stringify(newDB));
}