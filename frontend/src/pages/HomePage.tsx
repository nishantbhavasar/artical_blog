import Home from '../components/Home/Home';
import { triggerGetAllArtical, triggerGetArtical, triggerGetMyArtical,  } from '../store/Actions/articalAction';
import { connect } from 'react-redux';
import { triggerLogout } from '../store/Actions/authAction';

const mapStateToProps = (state:any) => ({
  isLogin:state.authReducer.isLogin,
  userData:state.authReducer.data,
  articals:state.articalReducer.articals,
})
const mapDispatchToProps=(dispatch:any)=>({
  getAllArticals:(payload:any)=>dispatch(triggerGetAllArtical(payload)),
  getMyArticals:(payload:any)=>dispatch(triggerGetMyArtical(payload)),
  getArtical:(payload:any)=>dispatch(triggerGetArtical(payload)),  
  handleLogout:(payload:any)=>dispatch(triggerLogout())
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
