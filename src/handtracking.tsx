import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

const download = 'https://github.com/urmamge/drag-trainer/releases/tag/v1.1.0';

/** Each step of the hand tracking, in the order it happens. */
const steps: { title: string; body: ReactNode[] }[] = [
  {
    title: 'It finds your hand in the video',
    body: [
      <>
        Drag Trainer uses <b>MediaPipe</b>, a free hand tracker made by Google. It looks at each frame of the video, up
        to 60 times a second, and finds 21 points on your hand: your wrist, every knuckle and every fingertip. Join the
        dots and you get a stick-figure skeleton of your hand, which you can see drawn over the camera preview.
      </>,
      <>
        The part that matters most for drag clicking is your clicking finger, from its middle knuckle to its tip, so
        that’s drawn in green.
      </>,
    ],
  },
  {
    title: 'You show it where the button is',
    body: [
      <>
        The camera can see your hand, but it has no idea where your mouse button is. So you calibrate: hold your
        fingertip at the back of the button for a 3 second countdown, then do the same at the front edge.
      </>,
      <>
        It takes your fingertip’s position over the last half second of each countdown, so a tiny wobble doesn’t
        throw it off, and draws the button as a dashed orange line. Every measurement after that is made relative to
        that line, which is why you need to calibrate again if the camera moves.
      </>,
    ],
  },
  {
    title: 'It matches the video to your clicks',
    body: [
      <>
        Every video frame is stamped with the moment the camera took it, on the same clock as your clicks. When a drag
        ends, the app picks out just the frames from your first click to your last, so it knows exactly what your hand
        was doing during that drag and nothing else.
      </>,
    ],
  },
  {
    title: 'It measures what your finger did',
    body: [
      <>From those frames it works out:</>,
      <>
        <b>Finger angle:</b> how steep your finger is compared with the button. Flat is 0°, pointing straight down is
        90°.
      </>,
      <>
        <b>Start spot:</b> where along the button your fingertip was when the drag began: at the back, in the middle or
        near the front edge.
      </>,
      <>
        <b>Length and speed:</b> how far your fingertip slid along the button and how quickly.
      </>,
      <>
        <b>Lift:</b> whether your fingertip rose off the button partway through, which usually means the clicks stop.
      </>,
      <>
        <b>Steadiness:</b> how much your finger angle changed during the drag.
      </>,
      <>
        Distances are measured in “hand sizes” rather than pixels, so it doesn’t matter how close the camera is. To show
        them in cm it assumes an average hand, which is why the cm numbers are only rough.
      </>,
    ],
  },
  {
    title: 'It learns what works for you',
    body: [
      <>
        Before it knows you, the coach gives general tips, like “your finger is quite flat, try tilting it up towards
        45°”.
      </>,
      <>
        After 8 tracked drags it switches to comparing you with yourself. It sorts your drags by how many clicks they
        got, then compares the best third with the worst third. If your best drags start nearer the front, or with a
        steeper finger, it tells you, and puts a green circle on the preview where your best drags start.
      </>,
      <>
        There’s no single right way to drag click, because every finger and mouse is different. Learning from your own
        best drags means the tips fit you, not someone else.
      </>,
    ],
  },
  {
    title: 'It can replay your drags (if you want)',
    body: [
      <>
        If you turn on recording, it keeps a few seconds of small video frames in memory. When a drag ranks among your 3
        best or 3 worst of the session, those frames are saved on your PC along with what made that drag good or bad.
        You can then watch it back in slow motion or frame by frame, with every click marked.
      </>,
    ],
  },
];

const limits = [
  'It can’t see how hard you’re pressing or the vibration in your finger, and those matter a lot. If your best and worst drags look the same on camera, the difference is probably pressure, and it’ll tell you so',
  'It needs a side-on view of your hand, so a webcam pointed at your face won’t work. A phone propped up beside your mouse works best',
  'Fast drags need a good frame rate. Bright lighting and a 60fps camera setting help',
];

const privacy = [
  'Everything happens on your PC. The hand tracker is built into the app, so the video is never uploaded anywhere',
  'Nothing is recorded unless you turn on recording, and then it only keeps short clips of your 3 best and 3 worst drags on your PC',
  'The camera is only on while you’re using hand tracking, and the microphone is never used',
];

function Points({ lines }: { lines: string[] }) {
  return (
    <Stack gap="sm">
      {lines.map((line) => (
        <Text key={line} c="dark.1" size="sm">
          {line}
        </Text>
      ))}
    </Stack>
  );
}

/** matthewhearst.com/apps/dragtrainer/handtracking */
mount(
  <Subpage
    back={{ href: '/apps/dragtrainer/', label: 'Back to Drag Trainer' }}
    action={<KofiButton />}
    eyebrow="drag trainer v1.1"
    title="How hand tracking works"
    intro="Drag Trainer v1.1 can watch your hand through a camera and tell you what your finger did on every drag. Here’s how it does that, without the maths."
  >
    <Stack gap={48}>
      <Stack gap="lg">
        {steps.map((step, i) => (
          <div key={step.title} className={classes.panel}>
            <div className={classes.step}>
              <span className={classes.stepNumber}>{i + 1}</span>
              <Stack gap="sm" style={{ minWidth: 0 }}>
                <Title order={2} fz="h4" pt={2}>
                  {step.title}
                </Title>
                {step.body.map((line, j) => (
                  <Text key={j} c="dark.1" size="sm">
                    {line}
                  </Text>
                ))}
              </Stack>
            </div>
          </div>
        ))}
      </Stack>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          What it can’t see
        </Title>
        <Points lines={limits} />
      </div>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Your privacy
        </Title>
        <Points lines={privacy} />
      </div>

      <Group gap="sm">
        <Button component="a" href={download} target="_blank" rel="noopener noreferrer" color="blush" autoContrast size="md" leftSection={<IconDownload size={18} />}>
          Download v1.1
        </Button>
      </Group>
    </Stack>
  </Subpage>,
);
