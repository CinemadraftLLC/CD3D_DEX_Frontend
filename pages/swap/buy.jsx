import styles from '../../styles/swap.module.css';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import BuyTokens from '../../components/TokenPage/BuyTokens';
import Header from '../../components/Header';
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ChartContainer from '../../components/CustomChart';

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#47D7AC',
    height: '3px',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: ' 90px',
  color: '#fff !important',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  height: '3.397810218978103vh',
  borderRight: '1px solid #F5F5F5',
  fontSize: '0.8333333333333334vw',
  borderBottom: '3px solid black !important',
  '&.Mui-selected': {
    color: '#75e4aa !important ',
    fontStyle: 'normal',
    fontSize: '0.8333333333333334vw',
  },
  '&.Mui-focusVisible': {},

  '&.MuiTab-root:last-child': {
    borderRight: 'none',
  },
}));

function SwapPageBuy() {
  const [value, setValue] = useState('buy');
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.outerContainer}>
        <div className={styles.outerSubContainer}>
          <div className={styles.leftContainer}>
            <ChartContainer />
          </div>
          <div className={styles.rightContainer}>
            <AntTabs value={value} aria-label='secondary tabs example' className={styles.tabContainer}>
              <AntTab
                value={'buy'}
                label={'Buy'}
                onClick={() => {
                  router.push('/swap/buy');
                }}
              />
              <AntTab
                value={'sell'}
                label={'Sell'}
                onClick={() => {
                  router.push('/swap/sell');
                }}
              />
            </AntTabs>
            <BuyTokens />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapPageBuy;
