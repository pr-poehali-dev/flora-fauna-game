import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const GAME_DATA = {
  animals: [
    { 
      word: 'МЕДВЕДЬ', 
      hint: 'Крупный хищник, хозяин тайги, впадает в зимнюю спячку', 
      category: 'Животные',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/281fb2a8-6ced-45b6-821c-8fe4a76354aa.jpg'
    },
    { 
      word: 'СОБОЛЬ', 
      hint: 'Ценный пушной зверёк с тёмной шкуркой', 
      category: 'Животные',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/22e94dd8-47f7-49ee-8f55-22ddc31286d4.jpg'
    },
    { 
      word: 'РЫСЬ', 
      hint: 'Дикая кошка с кисточками на ушах', 
      category: 'Животные',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/da2825ab-d605-4e48-a806-0ebe3d4b36ea.jpg'
    },
    { 
      word: 'ГЛУХАРЬ', 
      hint: 'Крупная лесная птица, токует весной', 
      category: 'Животные',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/2b1f868b-7b36-4f86-ad83-156cb99a39a8.jpg'
    },
    { 
      word: 'КУНИЦА', 
      hint: 'Проворный хищник из семейства куньих', 
      category: 'Животные',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/af0013cb-edcd-43f5-b80b-84b67f5e787d.jpg'
    },
  ],
  plants: [
    { 
      word: 'КЕДР', 
      hint: 'Хвойное дерево с вкусными орешками', 
      category: 'Растения',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/8e3645eb-2a30-47d2-925d-8c38552c22e5.jpg'
    },
    { 
      word: 'ПИХТА', 
      hint: 'Вечнозелёное хвойное дерево с плоской хвоей', 
      category: 'Растения',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/e59b26b5-8c4a-48c7-a7ad-300601ad6960.jpg'
    },
    { 
      word: 'БАГУЛЬНИК', 
      hint: 'Кустарник с душистыми белыми цветами', 
      category: 'Растения',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/d4d23118-2201-4224-a5f6-7fb3e3ff3d30.jpg'
    },
    { 
      word: 'БРУСНИКА', 
      hint: 'Ягодный кустарничек, плоды красные и кислые', 
      category: 'Растения',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/e284703d-811e-4225-9d60-1bebdfec02b4.jpg'
    },
    { 
      word: 'ЧЕРНИКА', 
      hint: 'Кустарничек с чёрными сладкими ягодами', 
      category: 'Растения',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/82ec7f5d-7c4f-4c3d-9530-7be24bb87429.jpg'
    },
  ],
  rare: [
    { 
      word: 'ВЫДРА', 
      hint: 'Водный зверёк-рыболов с ценным мехом', 
      category: 'Редкие виды',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/56c8323d-eff2-4c34-bb1f-3340f7333247.jpg'
    },
    { 
      word: 'ФИЛИН', 
      hint: 'Крупная ночная хищная птица', 
      category: 'Редкие виды',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/5c94a26c-b328-4ac7-9c95-10beb7405026.jpg'
    },
    { 
      word: 'ВЕНЕРИН', 
      hint: 'Редкий вид башмачка - цветок-орхидея', 
      category: 'Редкие виды',
      image: 'https://cdn.poehali.dev/projects/eaf0a102-ff62-4535-a684-0be0ce1d48ef/files/6cee3937-980c-4ae0-baf1-86b701ae24c2.jpg'
    },
  ],
};

const Index = () => {
  const [activeSection, setActiveSection] = useState<'menu' | 'game'>('menu');
  const [showImage, setShowImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'animals' | 'plants' | 'rare'>('animals');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints] = useState(3);

  const getCurrentWord = () => {
    const categoryWords = GAME_DATA[selectedCategory];
    return categoryWords[currentWordIndex];
  };

  const currentWord = getCurrentWord();

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (currentWord.word.includes(letter)) {
      setScore(score + 10);
    } else {
      setAttempts(attempts - 1);
    }

    const allLettersGuessed = currentWord.word
      .split('')
      .every(l => newGuessedLetters.includes(l));

    if (allLettersGuessed) {
      setTimeout(() => {
        setScore(score + 50);
        nextWord();
      }, 1000);
    }

    if (attempts <= 1 && !currentWord.word.includes(letter)) {
      setTimeout(() => {
        nextWord();
      }, 1000);
    }
  };

  const nextWord = () => {
    const categoryWords = GAME_DATA[selectedCategory];
    if (currentWordIndex < categoryWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
    setGuessedLetters([]);
    setAttempts(5);
    setShowImage(false);
  };

  const startGame = (category: 'animals' | 'plants' | 'rare') => {
    setSelectedCategory(category);
    setActiveSection('game');
    setCurrentWordIndex(0);
    setGuessedLetters([]);
    setScore(0);
    setAttempts(5);
    setHintsUsed(0);
    setShowImage(false);
  };

  const useHint = () => {
    if (hintsUsed >= maxHints) return;
    
    const unguessedLetters = currentWord.word
      .split('')
      .filter(letter => !guessedLetters.includes(letter));
    
    if (unguessedLetters.length > 0) {
      const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
      setGuessedLetters([...guessedLetters, randomLetter]);
      setHintsUsed(hintsUsed + 1);
      setScore(Math.max(0, score - 5));
    }
  };

  const toggleImageHint = () => {
    if (!showImage) {
      setScore(Math.max(0, score - 10));
    }
    setShowImage(!showImage);
  };

  const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');

  if (activeSection === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              🌲 Поле чудес: Природа Пермского края 🦌
            </h1>
            <p className="text-lg text-muted-foreground">
              Образовательная игра о животных и растениях родного края
            </p>
          </div>

          <Tabs defaultValue="game" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="game">
                <Icon name="Gamepad2" size={18} className="mr-2" />
                Игра
              </TabsTrigger>
              <TabsTrigger value="encyclopedia">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Энциклопедия
              </TabsTrigger>
              <TabsTrigger value="rating">
                <Icon name="Trophy" size={18} className="mr-2" />
                Рейтинг
              </TabsTrigger>
              <TabsTrigger value="categories">
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Категории
              </TabsTrigger>
              <TabsTrigger value="help">
                <Icon name="HelpCircle" size={18} className="mr-2" />
                Помощь
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Icon name="Mail" size={18} className="mr-2" />
                Контакты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="game" className="animate-scale-in">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 duration-200" onClick={() => startGame('animals')}>
                  <CardHeader>
                    <div className="text-6xl text-center mb-4">🦌</div>
                    <CardTitle className="text-center">Животные</CardTitle>
                    <CardDescription className="text-center">
                      Узнай о животных Пермского края
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать игру
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 duration-200" onClick={() => startGame('plants')}>
                  <CardHeader>
                    <div className="text-6xl text-center mb-4">🌿</div>
                    <CardTitle className="text-center">Растения</CardTitle>
                    <CardDescription className="text-center">
                      Изучи растительный мир края
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать игру
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 duration-200" onClick={() => startGame('rare')}>
                  <CardHeader>
                    <div className="text-6xl text-center mb-4">📕</div>
                    <CardTitle className="text-center">Редкие виды</CardTitle>
                    <CardDescription className="text-center">
                      Красная книга Прикамья
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать игру
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="encyclopedia" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" size={24} />
                    Энциклопедия природы Пермского края
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Пермский край — удивительный регион с богатым биоразнообразием:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Животный мир:</strong> Более 60 видов млекопитающих, 270 видов птиц</li>
                    <li><strong>Растительность:</strong> Таёжные леса, редкие орхидеи, ягодные кустарнички</li>
                    <li><strong>Красная книга:</strong> Охраняются выдра, филин, венерин башмачок и другие виды</li>
                    <li><strong>Экосистемы:</strong> Темнохвойная тайга, смешанные леса, горная тундра</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rating" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" size={24} />
                    Рейтинг игроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-lg">🥇 1</Badge>
                        <span className="font-semibold">Знаток природы</span>
                      </div>
                      <span className="text-lg font-bold">850 очков</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-lg">🥈 2</Badge>
                        <span className="font-semibold">Юный биолог</span>
                      </div>
                      <span className="text-lg font-bold">720 очков</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-lg">🥉 3</Badge>
                        <span className="font-semibold">Исследователь</span>
                      </div>
                      <span className="text-lg font-bold">680 очков</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Grid3x3" size={24} />
                    Категории викторины
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-bold mb-2">🦌 Животные</h3>
                      <p className="text-sm text-muted-foreground">Медведь, соболь, рысь, глухарь, куница</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-bold mb-2">🌿 Растения</h3>
                      <p className="text-sm text-muted-foreground">Кедр, пихта, багульник, брусника, черника</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-bold mb-2">📕 Редкие виды</h3>
                      <p className="text-sm text-muted-foreground">Выдра, филин, венерин башмачок</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-bold mb-2">🌲 Экосистемы</h3>
                      <p className="text-sm text-muted-foreground">Скоро появятся новые категории</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={24} />
                    Как играть?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">📖 Правила игры:</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Выберите категорию: Животные, Растения или Редкие виды</li>
                      <li>Прочитайте подсказку о загаданном слове</li>
                      <li>Угадывайте буквы, кликая на них в алфавите</li>
                      <li>За правильную букву получаете 10 очков</li>
                      <li>За угаданное слово — бонус 50 очков</li>
                      <li>У вас есть 5 попыток на каждое слово</li>
                      <li>Используйте подсказки (открывают случайную букву), но они отнимают 5 очков</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">🎯 Система баллов:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Правильная буква: +10 очков</li>
                      <li>Угаданное слово: +50 очков</li>
                      <li>Использование подсказки: -5 очков</li>
                      <li>Доступно 3 подсказки на игру</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={24} />
                    Контакты и обратная связь
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Свяжитесь с нами для предложений и вопросов:</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Mail" size={20} />
                      <span>nature.perm@education.ru</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Phone" size={20} />
                      <span>+7 (342) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="MapPin" size={20} />
                      <span>г. Пермь, ул. Ленина, 1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => setActiveSection('menu')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Главное меню
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 animate-pulse-glow">
                <Icon name="Star" size={20} className="mr-2" />
                {score} очков
              </Badge>
              <Badge variant={attempts > 2 ? "default" : "destructive"} className="text-lg px-4 py-2">
                <Icon name="Heart" size={20} className="mr-2" />
                {attempts} попыток
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Icon name="Lightbulb" size={20} className="mr-2" />
                {maxHints - hintsUsed} подсказок
              </Badge>
            </div>
          </div>

          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge>{currentWord.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  Слово {currentWordIndex + 1} из {GAME_DATA[selectedCategory].length}
                </span>
              </div>
              <CardTitle className="text-2xl mt-4">{currentWord.hint}</CardTitle>
            </CardHeader>
            <CardContent>
              {showImage && (
                <div className="mb-6 flex justify-center">
                  <img 
                    src={currentWord.image} 
                    alt={currentWord.word}
                    className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg animate-fade-in"
                  />
                </div>
              )}

              <Progress value={(guessedLetters.length / currentWord.word.length) * 100} className="mb-6" />
              
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {currentWord.word.split('').map((letter, index) => (
                  <div
                    key={index}
                    className={`w-14 h-16 flex items-center justify-center border-2 border-primary rounded-lg text-3xl font-bold transition-all duration-300 ${
                      guessedLetters.includes(letter)
                        ? 'bg-primary text-primary-foreground animate-scale-in'
                        : 'bg-white'
                    }`}
                  >
                    {guessedLetters.includes(letter) ? letter : ''}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Выберите букву:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {alphabet.map((letter) => (
                    <Button
                      key={letter}
                      variant={guessedLetters.includes(letter) ? "secondary" : "outline"}
                      disabled={guessedLetters.includes(letter)}
                      onClick={() => handleLetterGuess(letter)}
                      className="w-12 h-12 text-lg font-bold"
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={useHint} 
              variant="secondary" 
              size="lg"
              disabled={hintsUsed >= maxHints}
              className="animate-bounce-soft"
            >
              <Icon name="Lightbulb" size={20} className="mr-2" />
              Буква ({maxHints - hintsUsed})
            </Button>
            <Button 
              onClick={toggleImageHint} 
              variant={showImage ? "default" : "secondary"}
              size="lg"
            >
              <Icon name="Image" size={20} className="mr-2" />
              {showImage ? 'Скрыть фото' : 'Показать фото (-10)'}
            </Button>
            <Button onClick={nextWord} variant="outline" size="lg">
              <Icon name="SkipForward" size={20} className="mr-2" />
              Пропустить слово
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;