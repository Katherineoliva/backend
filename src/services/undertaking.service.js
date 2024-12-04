import Undertaking from "../models/undertaking.model.js";
import { undertakingErrorCodes } from "../utils/errorCodes/undertaking.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";
import { saveImages } from "../utils/saveImages.util.js";
import { updateRoleUser } from "./user.service.js";
import { addUndertaking } from "./user.service.js";

export const saveUndertaking = async (name, description, owner, image) => {
  try {
    const exist = await Undertaking.findOne({ name });
    if (exist)
      throw new ServiceError(
        "Undertaking already exist",
        undertakingErrorCodes.UNDERTAKING_ALREADY_EXIST
      );

    const url_image = await saveImages(image, "undertaking");
    const newUndertaking = new Undertaking({
      name,
      description,
      owner,
      photo: url_image,
    });
    if (!newUndertaking)
      throw new ServiceError(
        "Undertaking not created",
        undertakingErrorCodes.UNDERTAKING_NOT_CREATED
      );
    await newUndertaking.save();
    await addUndertaking(owner, newUndertaking._id);
    return newUndertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakings = async () => {
  try {
    const undertaking = await Undertaking.find();
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakingById = async (undertakingId) => {
  try {
    const undertaking = await Undertaking.findById(undertakingId).populate(
      "products"
    );
    if (!undertaking)
      throw new ServiceError(
        "Undertaking not found",
        undertakingErrorCodes.UNDERTAKING_NOT_FOUND
      );
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakingsByOwner = async (ownerId) => {
  try {
    const undertaking = (await Undertaking.find({ owner: ownerId })) || [];
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const deleteUndertaking = async (undertakingId) => {
  try {
    const event = await Undertaking.findByIdAndDelete(undertakingErrorCodes);
    if (!event)
      throw new ServiceError(
        "Event not found",
        undertakingErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const updateUndertaking = async (
  undertakingId,
  name,
  description,
  status,
  photos,
  likes,
  dislikes
) => {
  try {
    const undertaking = await Undertaking.findByIdAndUpdate(
      undertakingId,
      { name, description, status, photos, likes, dislikes },
      { new: true }
    );
    if (!undertaking)
      throw new ServiceError(
        "Undertaking not found",
        undertakingErrorCodes.UNDERTAKING_NOT_FOUND
      );
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const toggleLike = async (undertakingId, userId) => {
  try {
    const undertaking = await Undertaking.findById(undertakingId);
    if (!undertaking) {
      throw new Error("Undertaking no encontrado");
    }

    let updatedUndertaking;

    if (undertaking.likes.includes(userId)) {
      // Si el usuario ya dio like, eliminamos su ID
      updatedUndertaking = await Undertaking.findByIdAndUpdate(
        undertakingId,
        { $pull: { likes: userId } },
        { new: true } // Devuelve el documento actualizado
      );
    } else {
      // Si el usuario no dio like, agregamos su ID
      updatedUndertaking = await Undertaking.findByIdAndUpdate(
        undertakingId,
        { $push: { likes: userId } },
        { new: true } // Devuelve el documento actualizado
      );
    }

    return updatedUndertaking; 
  } catch (e) {
    console.error(e);
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};


export const toggleDislike = async (undertakingId, userId) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    if(!undertaking) 
      throw new ServiceError("Undertaking not found", undertakingErrorCodes.UNDERTAKING_NOT_FOUND);
    
    let updatedUndertaking;

    if (undertaking.dislikes.includes(userId))
    {
      updatedUndertaking = await Undertaking.findByIdAndUpdate(
        undertakingId,
        { $pull: { dislikes: userId }, new: true },
        { new: true }
      )
    }
    else
      {
        updatedUndertaking = await Undertaking.findByIdAndUpdate(
          undertakingId,
          { $push: { dislikes: userId }, new: true },
          { new: true }
        )
      }

    return updatedUndertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const toggleComments = async (undertakingId, commentId) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    if (undertaking.comments.includes(commentId))
      undertaking.comments = undertaking.comments.filter(
        (_id) => _id !== commentId
      );
    else undertaking.comments.push(commentId);

    await undertaking.save();
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      "error comments not ",
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const toggleStateUndertaking = async (undertakingId, status) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    undertaking.status = status;
    await undertaking.save();
    await updateRoleUser(undertaking.owner, "owner");
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const undertakingForState = async (status) => {
  try {
    const undertaking = await Undertaking.find({ status: status });
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const addProductToUndertaking = async (undertakingId, productId) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    undertaking.products.push(productId);
    await undertaking.save();
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakingForUser = async (userId) => {
  try {
    const undertaking = await Undertaking.find({
      owner: userId,
      status: "approved",
    }).populate("products");
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};
