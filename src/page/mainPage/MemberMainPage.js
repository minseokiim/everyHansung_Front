
const MemberMainPage=()=>{

    const handleClick=()=>{
        window.open('https://www.hansung.ac.kr/sites/hansung/index.do', '_blank');
    }

    return <div >
        <button className="button" onClick={handleClick}>한성대학교 홈페이지로 이동</button></div>
}

export default MemberMainPage;