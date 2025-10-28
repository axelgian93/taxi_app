//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_get200_response_items_inner.g.dart';

/// PaymentsGet200ResponseItemsInner
///
/// Properties:
/// * [id] 
/// * [tripId] 
/// * [amountUsd] 
/// * [status] 
/// * [method] 
/// * [provider] 
/// * [externalId] 
/// * [createdAt] 
/// * [updatedAt] 
/// * [isAuthorized] 
/// * [isPaid] 
/// * [isFailed] 
/// * [providerDisplay] 
/// * [capturable] 
@BuiltValue()
abstract class PaymentsGet200ResponseItemsInner implements Built<PaymentsGet200ResponseItemsInner, PaymentsGet200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'tripId')
  String? get tripId;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  @BuiltValueField(wireName: r'status')
  PaymentsGet200ResponseItemsInnerStatusEnum? get status;
  // enum statusEnum {  PENDING,  AUTHORIZED,  PAID,  FAILED,  REFUNDED,  };

  @BuiltValueField(wireName: r'method')
  String? get method;

  @BuiltValueField(wireName: r'provider')
  String? get provider;

  @BuiltValueField(wireName: r'externalId')
  String? get externalId;

  @BuiltValueField(wireName: r'createdAt')
  DateTime? get createdAt;

  @BuiltValueField(wireName: r'updatedAt')
  DateTime? get updatedAt;

  @BuiltValueField(wireName: r'isAuthorized')
  bool? get isAuthorized;

  @BuiltValueField(wireName: r'isPaid')
  bool? get isPaid;

  @BuiltValueField(wireName: r'isFailed')
  bool? get isFailed;

  @BuiltValueField(wireName: r'providerDisplay')
  String? get providerDisplay;

  @BuiltValueField(wireName: r'capturable')
  bool? get capturable;

  PaymentsGet200ResponseItemsInner._();

  factory PaymentsGet200ResponseItemsInner([void updates(PaymentsGet200ResponseItemsInnerBuilder b)]) = _$PaymentsGet200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsGet200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsGet200ResponseItemsInner> get serializer => _$PaymentsGet200ResponseItemsInnerSerializer();
}

class _$PaymentsGet200ResponseItemsInnerSerializer implements PrimitiveSerializer<PaymentsGet200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [PaymentsGet200ResponseItemsInner, _$PaymentsGet200ResponseItemsInner];

  @override
  final String wireName = r'PaymentsGet200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsGet200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.id != null) {
      yield r'id';
      yield serializers.serialize(
        object.id,
        specifiedType: const FullType(String),
      );
    }
    if (object.tripId != null) {
      yield r'tripId';
      yield serializers.serialize(
        object.tripId,
        specifiedType: const FullType(String),
      );
    }
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(PaymentsGet200ResponseItemsInnerStatusEnum),
      );
    }
    if (object.method != null) {
      yield r'method';
      yield serializers.serialize(
        object.method,
        specifiedType: const FullType(String),
      );
    }
    if (object.provider != null) {
      yield r'provider';
      yield serializers.serialize(
        object.provider,
        specifiedType: const FullType(String),
      );
    }
    if (object.externalId != null) {
      yield r'externalId';
      yield serializers.serialize(
        object.externalId,
        specifiedType: const FullType(String),
      );
    }
    if (object.createdAt != null) {
      yield r'createdAt';
      yield serializers.serialize(
        object.createdAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.updatedAt != null) {
      yield r'updatedAt';
      yield serializers.serialize(
        object.updatedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.isAuthorized != null) {
      yield r'isAuthorized';
      yield serializers.serialize(
        object.isAuthorized,
        specifiedType: const FullType(bool),
      );
    }
    if (object.isPaid != null) {
      yield r'isPaid';
      yield serializers.serialize(
        object.isPaid,
        specifiedType: const FullType(bool),
      );
    }
    if (object.isFailed != null) {
      yield r'isFailed';
      yield serializers.serialize(
        object.isFailed,
        specifiedType: const FullType(bool),
      );
    }
    if (object.providerDisplay != null) {
      yield r'providerDisplay';
      yield serializers.serialize(
        object.providerDisplay,
        specifiedType: const FullType(String),
      );
    }
    if (object.capturable != null) {
      yield r'capturable';
      yield serializers.serialize(
        object.capturable,
        specifiedType: const FullType(bool),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsGet200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsGet200ResponseItemsInnerBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'tripId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tripId = valueDes;
          break;
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PaymentsGet200ResponseItemsInnerStatusEnum),
          ) as PaymentsGet200ResponseItemsInnerStatusEnum;
          result.status = valueDes;
          break;
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.method = valueDes;
          break;
        case r'provider':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.provider = valueDes;
          break;
        case r'externalId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.externalId = valueDes;
          break;
        case r'createdAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'updatedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        case r'isAuthorized':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.isAuthorized = valueDes;
          break;
        case r'isPaid':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.isPaid = valueDes;
          break;
        case r'isFailed':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.isFailed = valueDes;
          break;
        case r'providerDisplay':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.providerDisplay = valueDes;
          break;
        case r'capturable':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.capturable = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsGet200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsGet200ResponseItemsInnerBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class PaymentsGet200ResponseItemsInnerStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'PENDING')
  static const PaymentsGet200ResponseItemsInnerStatusEnum PENDING = _$paymentsGet200ResponseItemsInnerStatusEnum_PENDING;
  @BuiltValueEnumConst(wireName: r'AUTHORIZED')
  static const PaymentsGet200ResponseItemsInnerStatusEnum AUTHORIZED = _$paymentsGet200ResponseItemsInnerStatusEnum_AUTHORIZED;
  @BuiltValueEnumConst(wireName: r'PAID')
  static const PaymentsGet200ResponseItemsInnerStatusEnum PAID = _$paymentsGet200ResponseItemsInnerStatusEnum_PAID;
  @BuiltValueEnumConst(wireName: r'FAILED')
  static const PaymentsGet200ResponseItemsInnerStatusEnum FAILED = _$paymentsGet200ResponseItemsInnerStatusEnum_FAILED;
  @BuiltValueEnumConst(wireName: r'REFUNDED')
  static const PaymentsGet200ResponseItemsInnerStatusEnum REFUNDED = _$paymentsGet200ResponseItemsInnerStatusEnum_REFUNDED;

  static Serializer<PaymentsGet200ResponseItemsInnerStatusEnum> get serializer => _$paymentsGet200ResponseItemsInnerStatusEnumSerializer;

  const PaymentsGet200ResponseItemsInnerStatusEnum._(String name): super(name);

  static BuiltSet<PaymentsGet200ResponseItemsInnerStatusEnum> get values => _$paymentsGet200ResponseItemsInnerStatusEnumValues;
  static PaymentsGet200ResponseItemsInnerStatusEnum valueOf(String name) => _$paymentsGet200ResponseItemsInnerStatusEnumValueOf(name);
}

