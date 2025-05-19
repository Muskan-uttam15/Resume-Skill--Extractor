
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
interface BackendStatusProps {
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  onTryReconnect: () => void;
}

const BackendStatus = ({ connectionStatus, onTryReconnect }: BackendStatusProps) => {
  return (
    <Card className={`p-4 flex justify-between items-center ${
      connectionStatus === 'connected' ? 'bg-green-50' : 
      connectionStatus === 'connecting' ? 'bg-yellow-50' : 'bg-red-50'
    }`}>
      <div className="flex items-center">
        <div className={`h-3 w-3 rounded-full mr-2 ${
          connectionStatus === 'connected' ? 'bg-green-500' : 
          connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
        <span className="text-sm font-medium">
          {connectionStatus === 'connected' && 'Connected to Python backend'}
          {connectionStatus === 'connecting' && 'Connecting to Python backend...'}
          {connectionStatus === 'disconnected' && 'Not connected to Python backend'}
        </span>
      </div>
      
      {connectionStatus === 'disconnected' && (
        <Button variant="outline" size="sm" onClick={onTryReconnect} className="text-xs">
          <AlertCircle className="h-3.5 w-3.5 mr-1" />
          Reconnect
        </Button>
      )}
    </Card>
  );
};

export default BackendStatus;
