import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface AdminPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isVisible, onClose }) => {
  const [contentForm, setContentForm] = useState({
    title: '',
    description: '',
    content: '',
    section: 'news'
  });
  
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [videoStream, setVideoStream] = useState({
    title: '',
    url: '',
    isLive: false
  });

  const [users] = useState([
    { id: 1, name: 'Анна Петрова', role: 'teacher', email: 'anna@school.ru', active: true },
    { id: 2, name: 'Мария Иванова', role: 'parent', email: 'maria@mail.ru', active: true },
    { id: 3, name: 'Олег Сидоров', role: 'teacher', email: 'oleg@school.ru', active: false }
  ]);

  const handleContentSubmit = () => {
    console.log('Добавляется контент:', contentForm);
    setContentForm({ title: '', description: '', content: '', section: 'news' });
    alert('Контент успешно добавлен!');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUpload(file);
      console.log('Файл выбран:', file.name);
      alert(`Файл "${file.name}" готов к загрузке`);
    }
  };

  const handleVideoStreamSubmit = () => {
    console.log('Настройка стрима:', videoStream);
    alert('Видео-трансляция настроена!');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-in-right">
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Icon name="Settings" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Панель управления куратора</h2>
                <p className="text-blue-100">Управление контентом и пользователями</p>
              </div>
            </div>
            <Button 
              onClick={onClose}
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <Icon name="FileText" size={16} />
                <span>Контент</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center space-x-2">
                <Icon name="Upload" size={16} />
                <span>Файлы</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center space-x-2">
                <Icon name="Video" size={16} />
                <span>Видео</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>Пользователи</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} />
                <span>Статистика</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="PlusCircle" className="mr-2" />
                    Добавить новый контент
                  </CardTitle>
                  <CardDescription>
                    Создайте новую запись для любого раздела сайта
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Заголовок</Label>
                      <Input
                        id="title"
                        value={contentForm.title}
                        onChange={(e) => setContentForm({...contentForm, title: e.target.value})}
                        placeholder="Введите заголовок"
                      />
                    </div>
                    <div>
                      <Label htmlFor="section">Раздел</Label>
                      <select
                        id="section"
                        className="w-full p-2 border rounded-md"
                        value={contentForm.section}
                        onChange={(e) => setContentForm({...contentForm, section: e.target.value})}
                      >
                        <option value="news">Новости</option>
                        <option value="materials">Материалы</option>
                        <option value="events">Мероприятия</option>
                        <option value="gallery">Галерея</option>
                        <option value="about">О проекте</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Краткое описание</Label>
                    <Input
                      id="description"
                      value={contentForm.description}
                      onChange={(e) => setContentForm({...contentForm, description: e.target.value})}
                      placeholder="Краткое описание контента"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Содержимое</Label>
                    <Textarea
                      id="content"
                      value={contentForm.content}
                      onChange={(e) => setContentForm({...contentForm, content: e.target.value})}
                      placeholder="Основной текст..."
                      rows={6}
                    />
                  </div>

                  <Button 
                    onClick={handleContentSubmit}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Icon name="Save" className="mr-2" size={16} />
                    Опубликовать контент
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="CloudUpload" className="mr-2" />
                    Управление файлами
                  </CardTitle>
                  <CardDescription>
                    Загружайте изображения, документы и материалы для проекта
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-xl font-semibold mb-2">Перетащите файлы сюда</p>
                      <p className="text-gray-500">или нажмите для выбора</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Поддерживаются: JPG, PNG, PDF, DOC, PPT (до 10MB)
                      </p>
                    </label>
                  </div>

                  {fileUpload && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name="FileCheck" className="text-green-600" size={20} />
                          <div>
                            <p className="font-medium">{fileUpload.name}</p>
                            <p className="text-sm text-gray-500">
                              {(fileUpload.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Icon name="Upload" className="mr-2" size={14} />
                          Загрузить
                        </Button>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon name="Image" className="text-blue-600" size={20} />
                        <span className="font-medium">Изображения</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">24</p>
                      <p className="text-sm text-gray-500">файлов загружено</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon name="FileText" className="text-green-600" size={20} />
                        <span className="font-medium">Документы</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-gray-500">файлов загружено</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon name="Presentation" className="text-purple-600" size={20} />
                        <span className="font-medium">Презентации</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">8</p>
                      <p className="text-sm text-gray-500">файлов загружено</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Play" className="mr-2 text-red-500" />
                    Видео-трансляции для детей
                  </CardTitle>
                  <CardDescription>
                    Настройте прямые трансляции образовательных программ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-red-700">ПРЯМОЙ ЭФИР</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Утренняя зарядка с Мишкой</h3>
                    <p className="text-gray-600 mb-4">Активно сейчас: 234 зрителя</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Pause" className="mr-2" size={14} />
                        Остановить
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Settings" className="mr-2" size={14} />
                        Настройки
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stream-title">Название трансляции</Label>
                      <Input
                        id="stream-title"
                        value={videoStream.title}
                        onChange={(e) => setVideoStream({...videoStream, title: e.target.value})}
                        placeholder="Весёлые игры с друзьями"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stream-url">YouTube URL или RTMP</Label>
                      <Input
                        id="stream-url"
                        value={videoStream.url}
                        onChange={(e) => setVideoStream({...videoStream, url: e.target.value})}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={videoStream.isLive}
                      onCheckedChange={(checked) => setVideoStream({...videoStream, isLive: checked})}
                    />
                    <Label>Включить прямую трансляцию</Label>
                  </div>

                  <Button 
                    onClick={handleVideoStreamSubmit}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  >
                    <Icon name="Video" className="mr-2" size={16} />
                    Запустить трансляцию
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="Users" className="mr-2" />
                      Управление пользователями
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Icon name="UserPlus" className="mr-2" size={14} />
                      Добавить
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <Icon name="User" className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge variant={user.role === 'teacher' ? 'default' : 'secondary'}>
                            {user.role === 'teacher' ? 'Педагог' : 'Родитель'}
                          </Badge>
                          <Switch checked={user.active} />
                          <Button size="sm" variant="outline">
                            <Icon name="Edit" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Всего пользователей</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">2,847</div>
                    <div className="text-sm text-green-600 flex items-center mt-2">
                      <Icon name="TrendingUp" size={14} className="mr-1" />
                      +12% за месяц
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Активность сегодня</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">1,234</div>
                    <div className="text-sm text-gray-500 mt-2">посещений</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Игр сыграно</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">5,678</div>
                    <div className="text-sm text-green-600 flex items-center mt-2">
                      <Icon name="TrendingUp" size={14} className="mr-1" />
                      +25% за неделю
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Материалов загружено</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">156</div>
                    <div className="text-sm text-gray-500 mt-2">файлов</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>График активности по дням</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Icon name="BarChart3" size={48} className="mx-auto mb-4" />
                      <p>График активности пользователей</p>
                      <p className="text-sm">Данные обновляются в реальном времени</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;