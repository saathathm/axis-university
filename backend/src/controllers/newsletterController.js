const prisma = require("../config/prisma");

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const normalizeEmail = (email) => {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
};

const buildSubscriberPayload = (body) => {
  const payload = {};

  if (body.email !== undefined) {
    payload.email = normalizeEmail(body.email);
  }

  if (body.firstName !== undefined) {
    payload.firstName = body.firstName || null;
  }

  if (body.lastName !== undefined) {
    payload.lastName = body.lastName || null;
  }

  if (body.status !== undefined) {
    payload.status = body.status;
  }

  return payload;
};

const subscribe = async (req, res, next) => {
  try {
    const data = buildSubscriberPayload(req.body);

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: data.email },
    });

    if (existingSubscriber) {
      const newsletterSubscriber = await prisma.newsletterSubscriber.update({
        where: { email: data.email },
        data: {
          ...data,
          status: "ACTIVE",
          subscribedAt: existingSubscriber.subscribedAt || new Date(),
          unsubscribedAt: null,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Newsletter subscription updated successfully",
        data: newsletterSubscriber,
      });
    }

    const newsletterSubscriber = await prisma.newsletterSubscriber.create({
      data: {
        ...data,
        status: "ACTIVE",
      },
    });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: newsletterSubscriber,
    });
  } catch (error) {
    next(error);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    const newsletterSubscriber = await prisma.newsletterSubscriber.update({
      where: { email },
      data: {
        status: "INACTIVE",
        unsubscribedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
      data: newsletterSubscriber,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};

const getSubscriberById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscriber ID",
      });
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscriber = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscriber ID",
      });
    }

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });

    if (!existingSubscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    const data = buildSubscriberPayload(req.body);

    if (data.status === "ACTIVE") {
      data.unsubscribedAt = null;
    }

    if (data.status === "INACTIVE") {
      data.unsubscribedAt = new Date();
    }

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Subscriber updated successfully",
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSubscriber = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscriber ID",
      });
    }

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });

    if (!existingSubscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: {
        status: "INACTIVE",
        unsubscribedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully",
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteSubscriber,
  getAllSubscribers,
  getSubscriberById,
  subscribe,
  unsubscribe,
  updateSubscriber,
};