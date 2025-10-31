import React, { useRef, useState } from "react";


type RenderProps = {
    isRecording: boolean;
    toggleRecording: () => Promise<void>;
    recordedBuffer: Uint8Array | null;
    clearRecording: () => void;
};

export const AudioRecorder: React.FC<{
    children: (props: RenderProps) => React.ReactNode;
    onRecordingComplete?: (buffer: Uint8Array) => void;
}> = ({ children, onRecordingComplete }) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBuffer, setRecordedBuffer] = useState<Uint8Array | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        chunksRef.current = [];

        recorder.ondataavailable = (ev: BlobEvent) => {
            if (ev.data && ev.data.size > 0) {
                chunksRef.current.push(ev.data);
            }
        };

        recorder.onstop = async () => {
            const blob = new Blob(chunksRef.current, {
                type: chunksRef.current[0]?.type || "audio/webm"
            });
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            setRecordedBuffer(buffer);

            if(onRecordingComplete) {
                onRecordingComplete(buffer);
            }

            mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
            mediaStreamRef.current = null;
            mediaRecorderRef.current = null;
            chunksRef.current = [];
            setIsRecording(false);
        };

        recorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        } else {
            mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
            mediaStreamRef.current = null;
            mediaRecorderRef.current = null;
            setIsRecording(false);
        }
    };

    const toggleRecording = async () => {
        if (!isRecording) {
            await startRecording();
        } else {
            stopRecording();
        }
    };

    const clearRecording = () => {
        setRecordedBuffer(null);
    };

    return <>{children({ isRecording, toggleRecording, recordedBuffer, clearRecording })}</>;
};