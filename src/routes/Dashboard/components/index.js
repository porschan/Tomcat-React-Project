import React from 'react';
import {connect} from 'dva';
import {Grid} from 'antd-mobile';
import './index.css';
import 'assets/common.css';
import clgd from 'assets/img/videoIncident/clgd.png';
import cxgd from 'assets/img/videoIncident/cxgd.png';
import sqgq from 'assets/img/videoIncident/sqgq.png';
import sqyq from 'assets/img/videoIncident/sqyq.png';
import dckc from 'assets/img/videoIncident/dckc.png';
import wybz from 'assets/img/videoIncident/wybz.png';
import wdgd from 'assets/img/videoIncident/wdgd.png';
import qrpj from 'assets/img/videoIncident/qrpj.png';
import {hashLocation, isNotBlank, isArrayEmpty} from "../../../utils/commonUtils";


function Index() {

    const gridAllData = [
        {
            icon: clgd,
            text: '处理工单',
            ascription: ['服务商','监理'],
            // key: 'queryTask',
            url: '/handleVideoTask'
        },
        {
            icon: cxgd,
            text: '查询工单',
            ascription: ['服务商','监理','管理员'],
            // key: 'queryTask',
            url: '/videoTaskList'
        },
        {
            icon: sqgq,
            text: '申请挂起',
            ascription: ['服务商'],
            // key: 'queryTask',
            url: '/hangupFrom'
        },
        {
            icon: sqyq,
            text: '申请延期',
            ascription: ['服务商'],
            // key: 'queryTask',
            url: '/delayFrom'
        },
        {
            icon: dckc,
            text: '到场勘查',
            ascription: ['监理'],
            // key: 'queryTask',
            url: '/surveyFrom'
        },
        {
            icon: wybz,
            text: '我要报障',
            ascription: ['监理','管理员','报障员'],
            // key: 'queryTask',
            url: '/reportingFrom'
        },
        {
            icon: wdgd,
            text: '我的工单',
            ascription: ['监理','管理员','报障员'],
            // key: 'queryTask',
            url: '/reportingList'
        },
        {
            icon: qrpj,
            text: '确认评价',
            ascription: ['监理','管理员','报障员'],
            // key: 'queryTask',
            url: '/reportingLikeList'
        }


        // {
        //     icon: queryTaskIcon,
        //     text: '查询工单',
        //     key: 'queryTask',
        //     url: '/taskDetail'
        // },
        // {
        //     icon: deviceReportingIcon,
        //     text: '我要报障',
        //     key: 'reporting',
        //     url: '/deviceReporting'
        // },
        // {
        //     icon: myTaskIcon,
        //     text: '我的工单',
        //     key: 'myTask',
        //     url: '/taskList'
        // },
        // {
        //     icon: goodIcon,
        //     text: '确认评价',
        //     key: 'confirmEvaluation',
        //     url: ''
        // },
    ];

    // 每个grid item 的样式
    let gridRender = dataItem => (
        <div style={{padding: '12.5px'}}>
            <img className={'grid_item_icon'} src={dataItem.icon} alt=""/>
            <div className={'grid_item_text'}>
                <span>{dataItem.text}</span>
            </div>
        </div>
    );

    let gridClick = (item, index) => {
        // console.log(item.key);
        // console.log(index);
        if (isNotBlank(item.url)) {
            hashLocation(item.url);
        }
    };

    let gridData = gainMenu('1024',gridAllData);

    return (
        <div>
            <div className={"panel_head"}>应用面板</div>
            <Grid data={gridData} columnNum={3} onClick={gridClick} renderItem={gridRender}/>
        </div>
    );
}

/**
 * 根据角色获取菜单
 * @returns {Array}
 */
function gainMenu(userCat,allMenu){

    let menuItem = [];
    if(userCat.trim()!=="" && !isArrayEmpty(allMenu)){
        if(userCat == '1024'){
            // 演示
            menuItem = allMenu;
        }else if (userCat == 1){
            // 服务商
            menuItem = allMenu.filter(item => item.ascription.indexOf("服务商") != -1);
        }else if(userCat == 3){
            // 监理
            menuItem = allMenu.filter(item => item.ascription.indexOf("监理") != -1);
        }else if(userCat == 9){
            // 管理员
            menuItem = allMenu.filter(item => item.ascription.indexOf("管理员") != -1);
        }else if(userCat == 1129){
            // 报障员
            menuItem = allMenu.filter(item => item.ascription.indexOf("报障员") != -1);
        }else{
            // other ?
        }
    }
    return menuItem;
}


Index.propTypes = {};

export default connect()(Index);
