import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{ role: string; username: string } | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30 * 60 * 1000); // Обновляем каждые 30 минут

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    // Система авторизации с заданными данными куратора
    if (loginForm.username === 'BlinovAnton2010' && loginForm.password === 'BRBlinov!!!!') {
      setCurrentUser({ role: 'curator', username: loginForm.username });
    } else if (loginForm.username && loginForm.password) {
      // Базовая логика для других пользователей
      const role = loginForm.username.includes('parent') ? 'parent' : 'teacher';
      setCurrentUser({ role, username: loginForm.username });
    }
    setLoginForm({ username: '', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();

    // Проверяем праздники
    if (month === 0 && date === 1) return "🎄 С Новым Годом!";
    if (month === 2 && date === 8) return "🌸 С 8 Марта!";
    if (month === 4 && date === 9) return "🎖️ С Днем Победы!";
    if (month === 5 && date === 1) return "👶 С Днем защиты детей!";
    if (month === 5 && date === 12) return "🇷🇺 С Днем России!";
    if (month === 8 && date === 1) return "📚 С Днем знаний!";
    if (month === 9 && date === 5) return "👨‍🏫 С Днем учителя!";

    // Обычные приветствия по времени
    if (hour < 12) return "🌅 Доброе утро!";
    if (hour < 17) return "☀️ Добрый день!";
    return "🌆 Добрый вечер!";
  };

  const navigationSections = [
    { id: 'home', title: 'Главная', icon: 'Home' },
    { id: 'about', title: 'О проекте', icon: 'Info' },
    { id: 'parents', title: 'Для родителей', icon: 'Users' },
    { id: 'teachers', title: 'Для педагогов', icon: 'GraduationCap' },
    { id: 'materials', title: 'Материалы', icon: 'BookOpen' },
    { id: 'events', title: 'Мероприятия', icon: 'Calendar' },
    { id: 'news', title: 'Новости', icon: 'Newspaper' },
    { id: 'gallery', title: 'Галерея', icon: 'Images' },
    { id: 'contacts', title: 'Контакты', icon: 'Phone' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      {/* Шапка с навигацией */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-red-300 to-blue-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-blue-400 rounded-full flex items-center justify-center">
                <Icon name="Star" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Будущее России</h1>
                <p className="text-sm text-gray-600">Образовательный проект для дошкольников</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">{getGreeting()}</p>
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>
              
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {currentUser.role === 'curator' ? 'Куратор' : 
                     currentUser.role === 'parent' ? 'Родитель' : 'Педагог'}
                  </Badge>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <Icon name="LogOut" size={16} className="mr-1" />
                    Выйти
                  </Button>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-red-400 to-blue-400 hover:from-red-500 hover:to-blue-500">
                      <Icon name="LogIn" size={16} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Вход в личный кабинет</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Логин</Label>
                        <Input 
                          id="username"
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                          placeholder="Введите логин"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Пароль</Label>
                        <Input 
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          placeholder="Введите пароль"
                        />
                      </div>
                      <Button onClick={handleLogin} className="w-full">
                        Войти
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        {/* Герой секция */}
        <section className="mb-12 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4 border-yellow-200">
            <img 
              src="/img/a40f1a63-2f0e-4f50-a77e-d26c99ebc900.jpg" 
              alt="Радуга с горкой" 
              className="mx-auto mb-6 w-48 h-48 object-cover rounded-2xl shadow-lg"
            />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Добро пожаловать в "Будущее России"! 🌟
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Образовательный проект для развития патриотизма и творческих способностей 
              у дошкольников через игру, творчество и познание родной страны
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">🇷🇺 Патриотизм</Badge>
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">🎨 Творчество</Badge>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">📚 Развитие</Badge>
              <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">🤝 Сотрудничество</Badge>
            </div>
          </div>
        </section>

        {/* Разделы для разных пользователей */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" className="text-lg">🌈 Для всех</TabsTrigger>
            <TabsTrigger value="children" className="text-lg">👶 Дети</TabsTrigger>
            <TabsTrigger value="parents" className="text-lg">👨‍👩‍👧‍👦 Родители</TabsTrigger>
            <TabsTrigger value="teachers" className="text-lg">👩‍🏫 Педагоги</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {navigationSections.map((section) => (
                <Card key={section.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={section.icon} className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">
                      {section.id === 'home' && 'Главная страница проекта с актуальной информацией'}
                      {section.id === 'about' && 'Узнайте больше о целях и задачах проекта'}
                      {section.id === 'parents' && 'Полезные материалы и рекомендации для родителей'}
                      {section.id === 'teachers' && 'Методические материалы и инструменты для педагогов'}
                      {section.id === 'materials' && 'Образовательные материалы и ресурсы'}
                      {section.id === 'events' && 'Календарь мероприятий и событий'}
                      {section.id === 'news' && 'Актуальные новости проекта'}
                      {section.id === 'gallery' && 'Фотографии с мероприятий и занятий'}
                      {section.id === 'contacts' && 'Контактная информация и обратная связь'}
                    </p>
                    <Button variant="outline" className="w-full hover:bg-blue-50">
                      Перейти к разделу
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="children" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">🎨 Творческая мастерская</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src="/img/9470473d-6a25-4b13-92f5-4ad66c990ab8.jpg" 
                    alt="Дети с кубиками ABC" 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-red-400 hover:bg-red-500 text-white">🖍️ Рисование</Button>
                    <Button className="bg-blue-400 hover:bg-blue-500 text-white">✂️ Поделки</Button>
                    <Button className="bg-green-400 hover:bg-green-500 text-white">🎭 Театр</Button>
                    <Button className="bg-purple-400 hover:bg-purple-500 text-white">🎵 Музыка</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">🚀 Игры и задания</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Button variant="outline" className="text-left h-auto p-4 hover:bg-blue-50">
                      <div>
                        <div className="font-semibold">🧩 Пазлы "Моя Россия"</div>
                        <div className="text-sm text-gray-600">Собери карту России из пазлов</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="text-left h-auto p-4 hover:bg-green-50">
                      <div>
                        <div className="font-semibold">🎯 Викторина "Знаешь ли ты?"</div>
                        <div className="text-sm text-gray-600">Отвечай на вопросы о родной стране</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="text-left h-auto p-4 hover:bg-yellow-50">
                      <div>
                        <div className="font-semibold">🎨 Раскраски</div>
                        <div className="text-sm text-gray-600">Раскрась символы России</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parents" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-100 to-emerald-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="BookOpen" className="mr-2" />
                    Методические рекомендации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Практические советы по развитию патриотических чувств у детей</p>
                  <Button variant="outline" className="w-full">Скачать материалы</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-100 to-rose-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Users" className="mr-2" />
                    Семейные проекты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Идеи для совместной деятельности родителей и детей</p>
                  <Button variant="outline" className="w-full">Посмотреть проекты</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-100 to-amber-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Calendar" className="mr-2" />
                    Календарь мероприятий
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Расписание детских мероприятий и праздников</p>
                  <Button variant="outline" className="w-full">Открыть календарь</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-indigo-100 to-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl">👩‍🏫 Педагогическая мастерская</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="FileText" className="mr-2" size={16} />
                      Конспекты занятий
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Presentation" className="mr-2" size={16} />
                      Презентации
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Video" className="mr-2" size={16} />
                      Видеоматериалы
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Download" className="mr-2" size={16} />
                      Дидактические материалы
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-100 to-cyan-100">
                <CardHeader>
                  <CardTitle className="text-xl">📊 Система управления</CardTitle>
                  {currentUser?.role === 'curator' && (
                    <Badge className="bg-green-500 text-white w-fit">Доступ куратора</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentUser?.role === 'curator' ? (
                    <div className="space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Icon name="Upload" className="mr-2" size={16} />
                        Загрузить материалы
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Icon name="Edit" className="mr-2" size={16} />
                        Редактировать содержимое
                      </Button>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Icon name="Users" className="mr-2" size={16} />
                        Управление пользователями
                      </Button>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <Icon name="BarChart3" className="mr-2" size={16} />
                        Статистика проекта
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      <Icon name="Lock" size={48} className="mx-auto mb-4 text-gray-400" />
                      <p>Для доступа к системе управления необходимо войти как куратор проекта</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Новости и события */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">📰 Актуальные новости</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-red-400">
              <CardHeader>
                <CardTitle className="text-lg">🎉 Новый образовательный модуль</CardTitle>
                <CardDescription>2 дня назад</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Запущен новый интерактивный модуль "Символы России" с играми и заданиями для дошкольников.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-400">
              <CardHeader>
                <CardTitle className="text-lg">👨‍👩‍👧‍👦 Семейный конкурс</CardTitle>
                <CardDescription>5 дней назад</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Стартовал конкурс семейных проектов "Моя малая Родина". Присоединяйтесь!</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-400">
              <CardHeader>
                <CardTitle className="text-lg">📚 Обновление материалов</CardTitle>
                <CardDescription>1 неделю назад</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Добавлены новые методические пособия для педагогов и конспекты тематических занятий.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Статистика проекта */}
        <section className="mb-12 bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">📊 Наши достижения</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-2xl">
              <div className="text-4xl font-bold text-red-600 mb-2">1,250</div>
              <div className="text-gray-700">Участвующих детей</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">85</div>
              <div className="text-gray-700">Детских садов</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">320</div>
              <div className="text-gray-700">Педагогов</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">2,100</div>
              <div className="text-gray-700">Родителей</div>
            </div>
          </div>
        </section>
      </main>

      {/* Подвал */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Будущее России</h4>
              <p className="text-gray-400">Образовательный проект для развития патриотических чувств у дошкольников</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О проекте</li>
                <li>Материалы</li>
                <li>Мероприятия</li>
                <li>Галерея</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Для кого</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Дошкольники</li>
                <li>Родители</li>
                <li>Педагоги</li>
                <li>Кураторы</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@future-russia.edu</li>
                <li>📞 +7 (495) 123-45-67</li>
                <li>📍 Москва, Россия</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Будущее России. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;