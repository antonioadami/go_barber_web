import React, { useState } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppointment,
    Section,
    Appointment,
    Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    const { selectedDate, setSelectedDate } = useState(new Date());

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatar_url} alt="Avatar" />
                        <div>
                            <span>Bem Vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda Feira</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img
                                src="https://avatars.githubusercontent.com/u/62675566?s=460&u=11c4317d67f5313f045b139918c1f37179843137&v=4"
                                alt="Antonio"
                            />
                            <strong>Antonio</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointment>

                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img
                                    src="https://avatars.githubusercontent.com/u/62675566?s=460&u=11c4317d67f5313f045b139918c1f37179843137&v=4"
                                    alt="Antonio"
                                />
                                <strong>Antonio</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>
                    </Section>
                </Schedule>
                <Calendar />
            </Content>
        </Container>
    );
};

export default Dashboard;
