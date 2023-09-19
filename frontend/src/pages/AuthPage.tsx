import Auth from '../components/Auth/Auth';
import { triggerLogin, triggerLogout } from '../store/Actions/authAction';
import { connect } from 'react-redux';

const mapStateToProps = (state:any) => ({
  isLogin:state.authReducer.isLogin,
  userData:state.authReducer.data
})
const mapDispatchToProps=(dispatch:any)=>({
  loginhandler:(payload:any)=>dispatch(triggerLogin(payload)),
  handleLogout:(payload:any)=>dispatch(triggerLogout())
})

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
