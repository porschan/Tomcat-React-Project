import React from 'react';
import {connect} from 'dva';
import './index.css';
import 'assets/common.css';
import { NavBar, Icon } from 'antd-mobile';


function Index() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    console.info('onLeftClick')
                    history.back();
                }}
                rightContent={[]}
            >申请延期</NavBar>
        </div>
    );
}

Index.propTypes = {};

export default connect()(Index);
