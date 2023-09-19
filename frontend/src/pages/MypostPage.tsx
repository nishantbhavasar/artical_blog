import {  triggerGetAllArtical, triggerGetArtical, triggerGetMyArtical, } from '../store/Actions/articalAction';
import { connect } from 'react-redux';
import { triggerLogout } from '../store/Actions/authAction';
import MyPost from '../components/Home/MyPosts';

const mapStateToProps = (state:any) => ({
  isLogin:state.authReducer.isLogin,
  userData:state.authReducer.data,
  myArticals:state.articalReducer.myArticals,
})
const mapDispatchToProps=(dispatch:any)=>({
  getAllArticals:(payload:any)=>dispatch(triggerGetAllArtical(payload)),
  getMyArticals:(payload:any)=>dispatch(triggerGetMyArtical(payload)),
  getArtical:(payload:any)=>dispatch(triggerGetArtical(payload)),  
  handleLogout:(payload:any)=>dispatch(triggerLogout()), 
})

export default connect(mapStateToProps,mapDispatchToProps)(MyPost);
