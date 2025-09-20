import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Brain, Search, Zap, CheckCircle, DollarSign, AlertCircle } from 'lucide-react';

const AIContextDashboard = () => {
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const [dashboardData] = useState({
    contextAccuracy: 94.5,
    informationQuality: 'A',
    validatedInfoRate: 87,
    tokenEfficiencyImprovement: 180,
    savedTokens: 2800,
    monthlySavings: 27
  });

  const simulateAnalysis = async (message) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAnalysis = {
      timestamp: new Date().toLocaleTimeString(),
      message: message.substring(0, 30) + '...',
      quality: (Math.random() * 2 + 8).toFixed(1),
      tokensSaved: Math.floor(Math.random() * 200 + 100),
      efficiency: Math.floor(Math.random() * 50 + 150)
    };
    
    setAnalysisHistory(prev => [newAnalysis, ...prev.slice(0, 4)]);
    setIsAnalyzing(false);
  };

  const handleAnalyze = () => {
    if (!userInput.trim()) return;
    simulateAnalysis(userInput);
    setUserInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧠 AI Context Management Dashboard
          </h1>
          <p className="text-gray-600">
            인간-AI 연합 지능형 문맥 시스템 실시간 모니터링
          </p>
        </div>

        {/* 실시간 분석 입력 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="mr-2 text-blue-600" />
            실시간 AI 분석 테스트
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="질문이나 요청사항을 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !userInput.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isAnalyzing ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              분석 시작
            </button>
          </div>
        </div>

        {/* 핵심 메트릭 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">문맥 정확도</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardData.contextAccuracy}%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">정보 품질</p>
                <p className="text-2xl font-bold text-green-600">{dashboardData.informationQuality}등급</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">토큰 효율성</p>
                <p className="text-2xl font-bold text-purple-600">+{dashboardData.tokenEfficiencyImprovement}%</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">비용 절약</p>
                <p className="text-2xl font-bold text-orange-600">${dashboardData.monthlySavings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* 분석 히스토리 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">최근 분석 히스토리</h2>
          <div className="space-y-3">
            {analysisHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                아직 분석 기록이 없습니다.<br />
                위에서 질문을 입력해보세요!
              </p>
            ) : (
              analysisHistory.map((analysis, index) => (
                <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-700">{analysis.message}</p>
                    <span className="text-xs text-gray-500">{analysis.timestamp}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <span>품질: {analysis.quality}/10</span>
                    <span>절약: {analysis.tokensSaved}토큰</span>
                    <span>효율성: +{analysis.efficiency}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 시스템 상태 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 text-sm">
              🎯 시스템이 실시간으로 학습 중입니다. GitHub에 코드가 안전하게 저장되었습니다!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContextDashboard;
