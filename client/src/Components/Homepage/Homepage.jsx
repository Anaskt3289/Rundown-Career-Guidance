import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'
import './Styles/Homepage.css'

function Homepage() {
  const navigate = useNavigate()
  // const settings = {
  //   dots: true,
  //   fade: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src="\Images\1920-X-700-Banner.webp" alt="" className='homeBanner' />
        </Grid>
      </Grid>
      <div className='Blocks'>
        <Grid container>
          <Grid item xs={4}>
            <div className='block'>
              <img src="\Images\4334653e51a39b53df44966fb06f4cf2.png" alt="" className='blockIcons' />
              <h3 className='blockHeading'>Find Your Career</h3>
              <p className='blockText'>Choose your ideal course and career with the help of experienced mentors.</p>
              <button className='blockBtns' onClick={() => navigate('/assessmentInstruction')}>Take Assessment</button>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className='block'>
              <img className='blockIcons' src="\Images\142-1428494_bridging-the-gap-event-at-lunch-mentor-icon__1_-removebg-preview.png" alt="" />

              <h3 className='blockHeading'>Be a Mentor</h3>
              <p className='blockText'>Be a Mentor to change people’s lives, world needs more leaders, successful people like you.</p>
              <button className='blockBtns'>Register</button>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className='block'>
              <img className='blockIcons' src="\Images\crawn-512.webp" alt="" />

              <h3 className='blockHeading'>Premium Membership</h3>
              <p className='blockText'>Buy premium memborship to avail more features like video call with mentors etc.</p>
              <button className='blockBtns'>Buy</button>
            </div>
          </Grid>



        </Grid>
      </div>
      <Container maxWidth="lg">
        <div >
          <h4 className='HowitWorks'>How it works.</h4>
          <div className='HowitWorksBlock'>
            <div>
              <h4 className='HowitWorksBlockHeading'>Take an aptitude test</h4>
              <p className='HowitWorksBlockText'>Take a aptitude test developed by our experts team which helps you to find out your interests and skills in various fields.</p>
            </div>
            <img src="\Images\medium-illustration-man-taking-test.webp" alt="" className='HowitWorksBlockImg' />
          </div>

          <div className='HowitWorksBlock' style={{ backgroundColor: 'white' }}>
            <img src="\Images\how-to-find-freelance-technical-seo-experts-5e9d6de1e4427-1520x800.png" alt="" className='HowitWorksBlockImgLeft' />
            <div>
              <h4 className='HowitWorksBlockHeading'>Find your mentors</h4>
              <p className='HowitWorksBlockText'>Admin will allocate an experienced mentor in your interested field for you . Premium membors can change their mentors as they like.</p>
            </div>
          </div>

          <div className='HowitWorksBlock'>
            <div>
              <h4 className='HowitWorksBlockHeading'>Connect with your mentors</h4>
              <p className='HowitWorksBlockText'>Book a time slot from mentors free time and chat with the mentors and ask your questions.</p>
            </div>
            <img src="\Images\a-man-works-on-a-laptop-the-guy-is-sitting-at-the-table-with-a-laptop-flat-style-good-for-image-work-office-hiring-staff-illustration-vector.jpg" alt="" className='HowitWorksBlockImgBlend' />
          </div>

          <div className='HowitWorksBlock' style={{ backgroundColor: 'white' }}>
            <img src="\Images\istockphoto-1257527796-170667a.jpg" alt="" className='HowitWorksBlockImgLeft' />
            <div>
              <h4 className='HowitWorksBlockHeading'>Video call with your mentors</h4>
              <p className='HowitWorksBlockText'>This option is available for premium members only . You can make video calls to the mentors and ask your questions and know more about your preffered industry .</p>
            </div>
          </div>

        </div>
      </Container>

      {/* <Container maxWidth="lg">

        <h4 className='meetOurMentor'>Meet Our Mentors</h4>

        <Slider {...settings}>
          <div>
            <img src='https://c1.wallpaperflare.com/preview/652/531/737/wood-aerial-background-beverage.jpg' />
          </div>
          <div>
          <img src='https://c1.wallpaperflare.com/preview/652/531/737/wood-aerial-background-beverage.jpg' />
          </div>
          <div>
          <img src='https://c1.wallpaperflare.com/preview/652/531/737/wood-aerial-background-beverage.jpg' />
          </div>
          <div>
          <img src='https://c1.wallpaperflare.com/preview/652/531/737/wood-aerial-background-beverage.jpg' />
          </div>
        </Slider>

      </Container> */}
    </div>

  )
}

export default Homepage
